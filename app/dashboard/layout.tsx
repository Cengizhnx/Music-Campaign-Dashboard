import { createServerSupabase } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { Suspense } from "react";
import { ClientUserMenu } from "@/components/ClientUserMenu";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const email = session.user.email ?? "user@example.com";
  const initials = email.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🎵 Music Admin
        </h2>
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
            📋 Dashboard
          </Link>
          <Link
            href="/dashboard/create"
            className="text-gray-700 hover:text-blue-600"
          >
            ➕ Yeni Kampanya
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Kontrol Paneli</h1>

          {/* Avatar + Email Dropdown */}
          <Suspense fallback={null}>
            <ClientUserMenu email={email} initials={initials} />
          </Suspense>
        </header>

        <div>{children}</div>
      </main>
    </div>
  );
}
