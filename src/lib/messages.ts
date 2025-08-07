import { prisma } from "@/lib/db";
import { AllMessages } from "@/utils/type";

export async function getPublicMessages(): Promise<AllMessages[]> {
  try {
    const messages = await prisma.message.findMany({
      where: {
        isPublic: true
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
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            emailVerified: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    });
    
    // Transform the data to match AllMessages type
    return messages.map(message => ({
      ...message,
      user_name: message.user_name || message.user?.name || undefined,
      user_image: message.user_image || message.user?.image || undefined,
      user_email: message.user_email || message.user?.email || undefined,
      user: message.user
    })) as AllMessages[];
  } catch (error) {
    console.error("Error fetching public messages:", error);
    return [];
  }
}

export async function getAllMessagesForUser(email: string): Promise<AllMessages[]> {
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { isPublic: true },
          {
            AND: [
              { isPublic: false },
              { user: { email } } 
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
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            emailVerified: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    });
    
    // Transform the data to match AllMessages type
    return messages.map(message => ({
      ...message,
      user_name: message.user_name || message.user?.name || undefined,
      user_image: message.user_image || message.user?.image || undefined,
      user_email: message.user_email || message.user?.email || undefined,
      user: message.user
    })) as AllMessages[];
  } catch (error) {
    console.error("Error fetching messages for user:", error);
    return [];
  }
}

export async function getAllMessagesForAdmin(): Promise<AllMessages[]> {
  try {
    const messages = await prisma.message.findMany({
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
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            emailVerified: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    });
    
    // Transform the data to match AllMessages type
    return messages.map(message => ({
      ...message,
      user_name: message.user_name || message.user?.name || undefined,
      user_image: message.user_image || message.user?.image || undefined,
      user_email: message.user_email || message.user?.email || undefined,
      user: message.user
    })) as AllMessages[];
  } catch (error) {
    console.error("Error fetching all messages for admin:", error);
    return [];
  }
}