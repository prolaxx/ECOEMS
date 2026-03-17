'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { AuthModal } from '@/components/auth/AuthModal';
import { ShieldCheck } from 'lucide-react';

export function Header() {
  const { user, signOut, initialize } = useAuthStore();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleLogout = async () => {
    await signOut();
  };

  const isAdmin = user?.role === 'admin';

  // Don't show header on admin pages (they have their own nav)
  if (isAdmin) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-xl text-[#002B7A] flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#002B7A] flex items-center justify-center text-white text-sm">S</div>
            Simulador
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 hidden sm:inline-block">
                  Hola, {user.user_metadata?.full_name || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-slate-500 hover:text-[#002B7A] transition-colors"
                >
                  Salir
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-4 py-2 rounded-lg bg-[#002B7A] text-white text-sm font-medium hover:bg-[#002366] transition-colors"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
