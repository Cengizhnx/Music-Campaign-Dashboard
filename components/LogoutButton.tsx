'use client';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login'); // çıkınca login sayfasına yönlendir
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-600 w-full text-left px-4 py-2 hover:bg-red-100 rounded-md cursor-pointer"
    >
      Çıkış Yap
    </button>
  );
}
