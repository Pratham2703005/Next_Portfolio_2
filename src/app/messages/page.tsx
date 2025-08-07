import { auth } from "@/utils/auth"
import { getPublicMessages, getAllMessagesForUser, getAllMessagesForAdmin } from "@/lib/messages"
import dynamic from "next/dynamic"
import { DEFAULT_CANVAS_MESSAGE_POSITION } from '@/utils/default-data'

// Dynamically import the client component
const MessageCanvasClient = dynamic(() => import("./message-canvas-client"), { ssr: true })

export default async function MessagesPage() {
  const session = await auth()
  
  // Fetch messages based on user role
  let messages = []
  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
  const email = session?.user?.email || ""
  
  if (!session) {
    // For non-logged in users, show only public messages
    messages = await getPublicMessages()
  } else if (isAdmin) {
    // For admin, show all messages
    messages = await getAllMessagesForAdmin()
  } else {
    // For regular users, show public messages and their own private messages
    messages = await getAllMessagesForUser(email)
  }
  
  return (
    <MessageCanvasClient 
      initialMessages={messages}
      session={session}
      isAdmin={!!isAdmin}
      defaultX={DEFAULT_CANVAS_MESSAGE_POSITION}
      defaultY={DEFAULT_CANVAS_MESSAGE_POSITION}
    />
  )
}