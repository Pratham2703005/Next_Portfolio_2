import { getSession, isAdmin } from "@/utils/auth-server";
import { getMessagesForUser } from "@/utils/messages-server";
import { AllMessages } from "@/utils/type";
import { MessagesClient } from "./messages-client";
import { getUserByEmail } from "@/lib/user-server";
import Link from "next/link";
import toast from "react-hot-toast";

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  // Get session on the server
  const session = await getSession();
  
  // Redirect to login if not authenticated
  if (!session?.user?.email) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="mb-4">Please sign in to view messages</p>
          <Link
            href="/api/auth/signin"
            className="bg-[#8e2de2] hover:bg-[#4a00e0] text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Check if user is admin
  const userIsAdmin = await isAdmin();
  
  // Fetch messages on the server
  let messages: AllMessages[] = [];
  try {
    messages = await getMessagesForUser(session.user.email);
  } catch (error ) {
    const err = error as Error;
    toast.error(`Error fetching messages: ${err.message}`);
  }

  // Fetch user data on the server
  let userData = null;
  try {
    userData = await getUserByEmail(session.user.email);
  } catch (error) {
    const err = error as Error;
    toast.error(`Error fetching user data: ${err.message}`);
  }
  return (
    <MessagesClient
      initialMessages={messages}
      isAdmin={userIsAdmin}
      userEmail={session.user.email}
      userData={userData}
    />
  );
}