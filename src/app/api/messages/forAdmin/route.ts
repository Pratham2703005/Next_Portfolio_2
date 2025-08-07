import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const allMessages = await prisma.message.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(allMessages);
    } catch (error) {
        console.error("Error fetching all messages:", error);
        return NextResponse.json(
            { error: "Failed to fetch messages" },
            { status: 500 }
        );
    }
}