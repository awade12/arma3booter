import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/core/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user');

  if (!userCookie) {
    redirect('/');
  }

  const user = JSON.parse(userCookie.value);

  return (
    <div className="flex h-screen bg-black">
      <Sidebar user={user} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
} 