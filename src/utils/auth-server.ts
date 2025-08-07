import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

/**
 * Gets the current session on the server side
 * @returns The session object or null if not authenticated
 */
export async function getSession() {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

/**
 * Checks if the user is authenticated on the server side
 * @returns True if authenticated, false otherwise
 */
export async function isAuthenticated() {
  const session = await getSession();
  return !!session;
}

/**
 * Gets the authenticated user's email
 * @returns The user's email or null if not authenticated
 */
export async function getUserEmail() {
  const session = await getSession();
  return session?.user?.email || null;
}

/**
 * Gets the authenticated user's data
 * @returns The user object or null if not authenticated
 */
export async function getUser() {
  const session = await getSession();
  return session?.user || null;
}

/**
 * Checks if the user is an admin
 * @returns True if the user is an admin, false otherwise
 */
export async function isAdmin() {
  const session = await getSession();
  return session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
}

/**
 * Redirects to login if the user is not authenticated
 * @param redirectTo Optional path to redirect to after login
 */
export async function requireAuth(redirectTo?: string) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect(`/api/auth/signin${redirectTo ? `?callbackUrl=${encodeURIComponent(redirectTo)}` : ''}`);
  }
}