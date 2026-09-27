"use client";

import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/ui/Loading";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";

/**
 * Main layout wrapper for authenticated dashboard pages.
 * Shows sidebar on desktop, bottom nav on mobile.
 */
export function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <Loading message="Loading..." />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64">
        <Header userName={user.name} userAvatar={user.avatar} />
        <main className="p-4 pb-20 md:pb-4">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
