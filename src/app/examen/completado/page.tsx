'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function ExamenCompletadoPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.role === 'admin') {
      router.push('/admin');
    }
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-[#002B7A] to-[#0044C8]" />

          <div className="px-8 py-14">
            <div className="flex justify-center mb-7">
              <div className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
            </div>

            <h1 className="font-serif text-3xl font-bold text-[#002B7A] mb-4">
              ¡Gracias por participar!
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              Tu examen diagnóstico ha sido enviado correctamente.
              El administrador revisará tus resultados próximamente.
            </p>
          </div>
        </div>

        <p className="text-slate-400 text-xs mt-6">
          © 2026 Simulador ECOEMS
        </p>
      </div>
    </main>
  );
}
