import { prisma } from "@/lib/db";
import toast from "react-hot-toast";

/**
 * Fetches user data by email
 * @param email User's email
 * @returns User data or null if not found
 */
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    return user;
  } catch (error) {
    const err = error as Error;
    toast.error(`Error fetching user by email: ${err.message}`);
    return null;
  }
}

/**
 * Fetches user data by ID
 * @param id User's ID
 * @returns User data or null if not found
 */
export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    return user;
  } catch (error) {
    const err = error as Error;
    toast.error(`Error fetching user by ID: ${err.message}`);
    return null;
  }
}