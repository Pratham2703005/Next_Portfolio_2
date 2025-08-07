import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { isPublic: true },
          {
            AND: [
              { isPublic: false },
              { user_email: email }
            ]
          }
        ]
      },
      select: {
        id: true,
        content: true,
        isPublic: true,
        x: true,
        y: true,
        userId: true,
        user_name: true,
        user_image: true,
        user_email: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching user messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}


