import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const {content, isPublic, x, y, userId, user_name, user_image, user_email} = await req.json();
        
        // Validate required fields
        if(!content || typeof x !== 'number' || typeof y !== 'number' || !userId || !user_name || !user_email) {
            return NextResponse.json(
                { error: 'Missing required fields: content, x, y, userId, user_name, user_email' },
                { status: 400 }
            );
        }
        
        const newMessage = await prisma.message.create({
            data: {
                content,
                isPublic: Boolean(isPublic),
                x,
                y,
                userId,
                user_name,
                user_image: user_image || null,
                user_email
            }
        });
        
        await prisma.user.update({
            where: {id: userId},
            data:{
                messages: {
                    connect: { id: newMessage.id },
                },
            }
        });
        
        return NextResponse.json(newMessage, { status: 201 });
    } catch (error) {
        console.error('Message creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create message' },
            { status: 500 }
        );
    }
}

export async function DELETE(req:NextRequest){
    try{
        const {id} = await req.json();
        
        if (!id) {
            return NextResponse.json(
                { error: 'Message ID is required' },
                { status: 400 }
            );
        }

        // Delete message and get user ID
        const messageUserId = await prisma.message.delete({
            where:{id: id},
            select:{
                userId:true
            }
        });
        
        // Disconnect message from user
        if(messageUserId?.userId){
            await prisma.user.update({
                where: {id :messageUserId.userId},
                data: {
                    messages:{
                        disconnect: {id : id}
                    }
                }
            });
        }
        
        return NextResponse.json({success:true});
    } catch(e){
        console.error('Message deletion error:', e);
        return NextResponse.json(
            { error: 'Failed to delete message' },
            { status: 500 }
        );
    }
}