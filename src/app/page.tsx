'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  IconSparkles, 
  IconBrain, 
  IconTarget, 
  IconChart, 
  IconArrowRight, 
  IconClock, 
  IconGraduation
} from '@/components/ui/Icons';
import { EXAM_SECTIONS } from '@/lib/constants';
import { useAuthStore } from '@/store/authStore';
import { useExamStore } from '@/store/examStore';
import { AuthModal } from '@/components/auth/AuthModal';
import { CheckCircle2, Eye } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user, initialize: initAuth } = useAuthStore();
  const { hasCompletedDiagnostic, checkExistingDiagnostic, results } = useExamStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [isCheckingHistory, setIsCheckingHistory] = useState(false);

  // Initialize auth on mount
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Check if user already completed diagnostic when logged in
  useEffect(() => {
    if (user) {
      setIsCheckingHistory(true);
      checkExistingDiagnostic().finally(() => setIsCheckingHistory(false));
    }
  }, [user, checkExistingDiagnostic]);

  const handleNavigation = (path: string) => {
    if (!user) {
      setPendingPath(path);
      setShowAuthModal(true);
    } else {
      router.push(path);
    }
  };

  const handleViewResults = () => {
    if (results) {
      router.push('/resultados');
    } else {
      // Load results from DB and redirect
      setIsCheckingHistory(true);
      checkExistingDiagnostic().then(({ results: loadedResults }) => {
        setIsCheckingHistory(false);
        if (loadedResults) {
          router.push('/resultados');
        }
      });
    }
  };

  const checkLoginAndRedirect = () => {
    setTimeout(() => {
      const currentUser = useAuthStore.getState().user;
      if (currentUser && pendingPath) {
        router.push(pendingPath);
        setPendingPath(null);
      }
    }, 100);
    setShowAuthModal(false);
  };

  return (
    <main className="min-h-screen relative">
      <AuthModal isOpen={showAuthModal} onClose={checkLoginAndRedirect} />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Smart Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#e2e8f0] text-[#002B7A] text-sm font-semibold mb-8 shadow-sm animate-float">
            <IconSparkles className="w-4 h-4 text-[#C59D5F]" />
            <span className="tracking-wide">Simulador de Excelencia Académica</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-[#002B7A] mb-6 tracking-tight leading-[1.15]">
            Prepárate para el Examen de <br />
            <span className="text-[#C59D5F] italic font-serif">Ingreso a Bachillerato</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            La plataforma más completa para asegurar tu lugar. Diagnóstico preciso, simulación realista y análisis de desempeño con tecnología inteligente.
          </p>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
            {/* Diagnostic Button - changes based on completion status */}
            {user && hasCompletedDiagnostic ? (
              <button
                onClick={handleViewResults}
                disabled={isCheckingHistory}
                className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
              >
                {isCheckingHistory ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <CheckCircle2 className="w-6 h-6" />
                )}
                Ver Mis Resultados
                <Eye className="w-5 h-5 opacity-70" />
              </button>
            ) : (
              <button
                onClick={() => handleNavigation('/instrucciones?modo=simulador_realista')}
                className="group btn-primary px-8 py-4 rounded-xl flex items-center gap-3 font-semibold text-lg"
              >
                <IconBrain className="w-6 h-6" />
                Diagnóstico
                <IconArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
            
            {/* Examen Final - Coming Soon */}
            <div className="relative group">
              <button
                disabled
                className="btn-secondary px-8 py-4 rounded-xl flex items-center gap-3 font-medium text-lg bg-white shadow-sm opacity-60 cursor-not-allowed border border-slate-200"
              >
                <IconGraduation className="w-6 h-6 text-[#C59D5F]" />
                Examen Final
              </button>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                Disponible próximamente
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45" />
              </div>
            </div>
          </div>

          {/* Completion Badge for logged users */}
          {user && hasCompletedDiagnostic && (
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 mb-8">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">¡Diagnóstico completado! Revisa tus resultados y plan de estudio.</span>
            </div>
          )}

          {/* Metrics / Trust */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-200 pt-10 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-[#002B7A] mb-1">128</div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Reactivos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#002B7A] mb-1">98%</div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Precisión</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#002B7A] mb-1">3hrs</div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Duración Real</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#002B7A] mb-1">10+</div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Materias</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards - Clean Style */}
      <section className="py-20 px-4 relative z-10 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl relative group bg-slate-50/50">
            <div className="w-14 h-14 rounded-xl bg-[#002B7A]/5 flex items-center justify-center mb-6 group-hover:bg-[#002B7A]/10 transition-colors">
              <IconClock className="w-7 h-7 text-[#002B7A]" />
            </div>
            <h3 className="text-xl font-bold text-[#002B7A] mb-3 font-serif">Simulación Realista</h3>
            <p className="text-slate-600 leading-relaxed">
              Réplica exacta de las condiciones temporales y de presión del examen oficial. Entrena tu mente para el día de la prueba.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl relative group bg-slate-50/50">
            <div className="w-14 h-14 rounded-xl bg-[#C59D5F]/10 flex items-center justify-center mb-6 group-hover:bg-[#C59D5F]/20 transition-colors">
              <IconChart className="w-7 h-7 text-[#C59D5F]" />
            </div>
            <h3 className="text-xl font-bold text-[#002B7A] mb-3 font-serif">Métricas Precisas</h3>
            <p className="text-slate-600 leading-relaxed">
              Análisis detallado de tu rendimiento por área. Identifica tus fortalezas y debilidades con gráficos claros.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl relative group bg-slate-50/50">
            <div className="w-14 h-14 rounded-xl bg-[#002B7A]/5 flex items-center justify-center mb-6 group-hover:bg-[#002B7A]/10 transition-colors">
              <IconTarget className="w-7 h-7 text-[#002B7A]" />
            </div>
            <h3 className="text-xl font-bold text-[#002B7A] mb-3 font-serif">Ruta Personalizada</h3>
            <p className="text-slate-600 leading-relaxed">
              Generamos recomendaciones de estudio basadas en tus resultados, priorizando los temas clave para mejorar tu puntaje.
            </p>
          </div>
        </div>
      </section>

      {/* Practice Areas - Hidden if diagnostic not completed */}
      {(!user || !hasCompletedDiagnostic) && (
        <section className="py-20 px-4 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-[#002B7A] mb-4 font-serif">Entrenamiento Focalizado</h2>
              <p className="text-slate-600 max-w-xl mx-auto">Selecciona una materia específica para practicar y reforzar tus conocimientos en áreas clave.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {EXAM_SECTIONS.map((section) => (
                <button
                  key={section}
                  onClick={() => handleNavigation(`/instrucciones?modo=practica_area&seccion=${encodeURIComponent(section)}`)}
                  className="group p-5 rounded-xl bg-white border border-slate-200 hover:border-[#C59D5F] hover:shadow-md transition-all text-center flex flex-col items-center justify-center min-h-[100px] w-full"
                >
                  <div className="text-sm font-semibold text-slate-700 group-hover:text-[#002B7A] transition-colors">
                    {section}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-10 border-t border-slate-200 bg-white text-center text-slate-500 text-sm relative z-10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded bg-[#002B7A] flex items-center justify-center text-white font-bold text-xl font-serif">S</div>
          <p>© 2026 Simulador de Examen Diagnóstico. Simulador Educativo de Alto Nivel.</p>
        </div>
      </footer>
    </main>
  );
}
