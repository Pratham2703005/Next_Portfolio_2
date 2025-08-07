import { prisma } from "@/lib/db";
import { AllMessages } from "@/utils/type";

/**
 * Fetches all messages for admin users
 * @returns Array of all messages
 */
export async function getAllMessages(): Promise<AllMessages[]> {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return messages as AllMessages[];
  } catch (error) {
    console.error("Error fetching all messages:", error);
    return [];
  }
}

/**
 * Fetches messages for a specific user
 * @param email User's email
 * @returns Array of messages visible to the user
 */
export async function getUserMessages(email: string): Promise<AllMessages[]> {
  try {
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
      orderBy: {
        createdAt: 'desc'
      }
    });
    return messages as AllMessages[];
  } catch (error) {
    console.error("Error fetching user messages:", error);
    return [];
  }
}

/**
 * Fetches messages for the authenticated user
 * @param email User's email
 * @returns Array of messages visible to the user
 */
export async function getMessagesForUser(email: string): Promise<AllMessages[]> {
  try {
    // For non-admin users, fetch public messages and their own private messages
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
    
    return messages as AllMessages[];
  } catch (error) {
    console.error("Error fetching messages for user:", error);
    return [];
  }
}