import { redirect } from 'next/navigation';
import { auth } from '@/utils/auth';

interface AdminAuthCheckProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default async function AdminAuthCheck({ 
  children, 
  redirectTo = '/blog' 
}: AdminAuthCheckProps) {
  const session = await auth();
  
  if (!session?.user?.email || session.user.email !== 'pk2732004@gmail.com') {
    redirect(redirectTo);
  }

  return <>{children}</>;
}