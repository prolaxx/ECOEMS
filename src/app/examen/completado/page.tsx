'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Home, BookOpen, Clock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useExamStore } from '@/store/examStore';

export default function ExamenCompletadoPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { hasCompletedDiagnostic } = useExamStore();

  useEffect(() => {
    // Admin shouldn't land here
    if (user?.role === 'admin') {
      router.push('/admin');
    }
    // Non-logged users shouldn't be here
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-lg">
        {/* Success card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Top accent */}
          <div className="h-2 bg-gradient-to-r from-[#002B7A] to-[#0044C8]" />

          <div className="px-8 pt-10 pb-10 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl font-bold text-[#002B7A] mb-3">
              ¡Examen Enviado!
            </h1>
            <p className="text-slate-500 text-base leading-relaxed mb-8">
              Tu examen diagnóstico ha sido recibido y guardado correctamente.
              Un administrador revisará tus resultados y te proporcionará
              retroalimentación.
            </p>

            {/* Info boxes */}
            <div className="grid gap-3 mb-8 text-left">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                <div className="w-9 h-9 rounded-lg bg-[#002B7A]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4 text-[#002B7A]" />
                </div>
                <div>
                  <p className="font-semibold text-[#002B7A] text-sm">Diagnóstico registrado</p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Tus respuestas han sido guardadas de forma segura en el sistema.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-50 border border-amber-100">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-amber-800 text-sm">Solo un intento permitido</p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    El examen diagnóstico solo puede realizarse una vez por usuario.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#002B7A] hover:bg-[#001C42] text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5" />
              Volver al Inicio
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-slate-400 text-xs mt-6">
          © 2026 Simulador ECOEMS — Examen completado exitosamente
        </p>
      </div>
    </main>
  );
}
