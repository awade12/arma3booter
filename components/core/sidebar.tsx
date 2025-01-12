'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { FiHome, FiSettings, FiServer, FiUsers, FiLogOut } from "react-icons/fi";
import { logout } from "@/app/actions/auth";

interface SidebarProps {
  user: {
    email: string;
  };
}

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: FiHome },
  { name: 'Servers', href: '/dashboard/servers', icon: FiServer },
  { name: 'Players', href: '/dashboard/players', icon: FiUsers },
  { name: 'Settings', href: '/dashboard/settings', icon: FiSettings },
];

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
    router.refresh();
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 border-r border-zinc-800 w-64">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-xl font-bold text-white">Arma 3 Launcher</h2>
      </div>

      <div className="flex-1 py-6 px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 px-2",
                isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              )}
              onClick={() => router.push(item.href)}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Button>
          );
        })}
      </div>

      <div className="p-4 border-t border-zinc-800">
        <div className="flex flex-col gap-4">
          <div className="px-2">
            <p className="text-sm text-zinc-400 truncate">{user.email}</p>
          </div>
          <Button
            variant="destructive"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <FiLogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
} 