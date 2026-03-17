'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useExamStore, useExamProgress } from '@/store/examStore';
import { useAuthStore } from '@/store/authStore';
import { useTelemetry, useFullscreen } from '@/hooks/useTelemetry';
import { Timer } from '@/components/exam/Timer';
import { QuestionView } from '@/components/exam/QuestionView';
import { QuestionGrid } from '@/components/exam/QuestionGrid';
import { Navigation } from '@/components/exam/Navigation';
import { AnalyzingAnimation } from '@/components/results/AnalyzingAnimation';
import { EXAM_CONFIGS } from '@/lib/constants';
import type { ClientQuestion, ExamConfig } from '@/types/exam';
import { cn } from '@/lib/utils';
import { 
  Maximize, 
  Minimize, 
  AlertCircle,
  CheckCircle2,
  Flag,
  ArrowRight,
  LayoutGrid,
  ShieldAlert
} from 'lucide-react';
import Link from 'next/link';

function ExamContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, initialize: initAuth } = useAuthStore();
  const { 
    startExam, 
    currentAttempt, 
    questions, 
    showPanel,
    togglePanel, 
    submitExam,
    recoverAttempt,
    results,
    hasCompletedDiagnostic
  } = useExamStore();
  const { answered, flagged, total } = useExamProgress();
  const { enterFullscreen, exitFullscreen, isFullscreen } = useFullscreen();
  
  useTelemetry();

  const [isLoading, setIsLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modo = searchParams.get('modo') || 'simulador_realista';
  const seccion = searchParams.get('seccion') || undefined;

  // Initialize auth on mount
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Initialize or recover exam
  useEffect(() => {
    const initExam = async () => {
      // Wait for auth to be ready
      if (!user) {
        // If no user after a brief wait, redirect to home
        await new Promise(resolve => setTimeout(resolve, 500));
        const currentUser = useAuthStore.getState().user;
        if (!currentUser) {
          router.push('/');
          return;
        }
      }

      // Check if there's an existing attempt to recover
      if (currentAttempt && !currentAttempt.isCompleted && questions.length > 0) {
        recoverAttempt();
        setIsLoading(false);
        return;
      }

      // Fetch questions based on mode
      try {
        let url = '/api/questions?';
        const params = new URLSearchParams();

        if (modo === 'simulador_realista') {
          params.set('mode', 'full');
        } else if (modo === 'diagnostico_rapido') {
          params.set('mode', 'diagnostic');
          params.set('count', '40');
        } else if (modo === 'practica_area' && seccion) {
          params.set('mode', 'practice');
          params.set('section', seccion);
          params.set('count', '20');
        } else {
          params.set('mode', 'full');
        }

        const response = await fetch(`/api/questions?${params.toString()}`);
        const data = await response.json();
        
        if (data.questions && data.questions.length > 0) {
          // Get the right config
          const configKey = modo === 'practica_area' ? 'practica_area_20' : modo;
          const config: ExamConfig = {
            ...EXAM_CONFIGS[configKey] || EXAM_CONFIGS.simulador_realista,
            selectedSection: seccion,
            examVersion: data.version
          };

          const result = await startExam(config, data.questions as ClientQuestion[]);
          
          if (!result.success) {
            setError(result.error || 'No se pudo iniciar el examen');
          }
        }
      } catch (err) {
        console.error('Error loading questions:', err);
        setError('Error al cargar las preguntas. Por favor intenta de nuevo.');
      }

      setIsLoading(false);
    };

    initExam();
  }, []);

  // Redirect after exam completion
  useEffect(() => {
    if (results && !isAnalyzing) {
      const isAdmin = useAuthStore.getState().user?.role === 'admin';
      router.push(isAdmin ? '/resultados' : '/examen/completado');
    }
  }, [results, router, isAnalyzing]);

  const handleToggleFullscreen = () => {
    if (isFullscreenMode) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
    setIsFullscreenMode(!isFullscreenMode);
  };

  const handleConfirmSubmit = () => {
    setShowSummary(false);
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = async () => {
    await submitExam();
    // The useEffect will handle the redirect once results are set
  };

  const unanswered = total - answered;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#002B7A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Cargando tu examen...</p>
        </div>
      </div>
    );
  }

  // Show error if user already completed diagnostic
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
        <div className="text-center max-w-md">
          <ShieldAlert className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#002B7A] mb-3 font-serif">Acceso Restringido</h2>
          <p className="text-slate-600 mb-8">{error}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn-primary px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 justify-center"
            >
              <CheckCircle2 className="w-5 h-5" />
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!currentAttempt || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2 font-serif">Error de Carga</h2>
          <p className="text-slate-600 mb-8">No se pudieron recuperar las preguntas del servidor. Por favor intenta nuevamente.</p>
          <Link
            href="/"
            className="btn-primary px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  // Show analyzing animation
  if (isAnalyzing) {
    return <AnalyzingAnimation onComplete={handleAnalysisComplete} />;
  }

  // Summary modal before submit
  if (showSummary) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50/90 backdrop-blur-sm z-50 fixed inset-0">
        <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-scale-in">
          <h2 className="font-serif text-3xl font-bold text-[#002B7A] mb-8 text-center">Resumen Final</h2>

          <div className="grid gap-4 mb-8">
            <div className="flex items-center justify-between p-5 rounded-xl bg-emerald-50 border border-emerald-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-emerald-900 font-medium">Respondidas</span>
              </div>
              <span className="text-2xl font-bold text-emerald-600">{answered}</span>
            </div>

            <div className="flex items-center justify-between p-5 rounded-xl bg-amber-50 border border-amber-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Flag className="w-6 h-6 text-amber-600" />
                </div>
                <span className="text-amber-900 font-medium">Marcadas</span>
              </div>
              <span className="text-2xl font-bold text-amber-600">{flagged}</span>
            </div>

            {unanswered > 0 && (
              <div className="flex items-center justify-between p-5 rounded-xl bg-red-50 border border-red-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-red-900 font-medium">Sin responder</span>
                </div>
                <span className="text-2xl font-bold text-red-600">{unanswered}</span>
              </div>
            )}
          </div>

          {unanswered > 0 && (
            <div className="rounded-xl p-4 mb-8 bg-red-50 border border-red-100 text-center">
              <p className="text-red-700 text-sm font-medium">
                ⚠️ Tienes {unanswered} pregunta{unanswered > 1 ? 's' : ''} sin responder. 
                <br/>Se contarán como incorrectas si finalizas ahora.
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => setShowSummary(false)}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Volver
            </button>
            <button
              onClick={handleConfirmSubmit}
              className="flex-1 py-3 px-4 rounded-xl bg-[#002B7A] text-white font-semibold hover:bg-[#001C42] shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Finalizar Examen
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
          
          {/* Logo & Progress */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#002B7A] flex items-center justify-center text-white font-serif font-bold text-lg">S</div>
                <h1 className="text-lg font-bold text-[#002B7A] hidden sm:block font-serif tracking-tight">
                Simulador de Examen
                </h1>
            </div>
            
            <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>
            
            <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Progreso</span>
                <div className="flex items-baseline gap-1">
                    <span className="text-[#002B7A] font-bold text-lg">{answered}</span>
                    <span className="text-slate-400 text-sm">/ {total}</span>
                </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <Timer />
            
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

            <div className="flex items-center gap-2">
                 <button
                onClick={togglePanel}
                className={cn(
                    'p-2.5 rounded-lg transition-all border',
                    showPanel
                    ? 'bg-[#002B7A] text-white border-[#002B7A]'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-[#002B7A] hover:text-[#002B7A]'
                )}
                title="Ver panel de preguntas"
                >
                <LayoutGrid className="w-5 h-5" />
                </button>

                <button
                onClick={handleToggleFullscreen}
                className="p-2.5 bg-white text-slate-500 rounded-lg hover:bg-slate-50 hover:text-[#002B7A] transition-all border border-slate-200 hidden sm:flex"
                title={isFullscreenMode ? 'Salir de pantalla completa' : 'Pantalla completa'}
                >
                {isFullscreenMode ? (
                    <Minimize className="w-5 h-5" />
                ) : (
                    <Maximize className="w-5 h-5" />
                )}
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex relative overflow-hidden">
        <div className={cn(
          'flex-1 transition-all duration-500 ease-in-out',
          showPanel ? 'mr-0 lg:mr-80' : 'mr-0'
        )}>
          <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
            <QuestionView />
          </div>
        </div>

        {/* Side Panel Overlay for Mobile */}
        {showPanel && (
          <div 
            className="fixed inset-0 bg-black/20 z-30 lg:hidden backdrop-blur-sm"
            onClick={togglePanel}
          />
        )}

        {/* Side Panel */}
        <aside className={cn(
          'fixed right-0 top-[73px] bottom-[73px] lg:bottom-0 w-80 bg-white border-l border-slate-200 shadow-2xl transform transition-transform duration-300 z-40 overflow-y-auto custom-scrollbar',
          showPanel ? 'translate-x-0' : 'translate-x-full'
        )}>
          <QuestionGrid />
        </aside>
      </main>

      {/* Footer Navigation */}
      <footer className="sticky bottom-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Navigation onShowSummary={() => setShowSummary(true)} />
        </div>
      </footer>
    </div>
  );
}

export default function ExamenPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-[#002B7A] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ExamContent />
    </Suspense>
  );
}
