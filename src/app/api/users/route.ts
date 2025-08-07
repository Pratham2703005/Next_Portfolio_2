import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        
        if(!email){
            return NextResponse.json(
                { error: 'Email parameter is required' },
                { status: 400 }
            );
        }
        
        const user = await prisma.user.findFirst({
            where:{email:email},
        });
        
        if(!user){
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(user);
    } catch (e) {
        console.error("Error fetching user:", e);
        return NextResponse.json(
            { error: 'Failed to fetch user' },
            { status: 500 }
        );
    }
}