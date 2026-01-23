'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Save,
  Flag,
  LayoutGrid,
  ArrowRight,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { EXAM_CONFIGS } from '@/lib/constants';
import { useAuthStore } from '@/store/authStore';
import { useExamStore } from '@/store/examStore';
import { AuthModal } from '@/components/auth/AuthModal';

interface InstructionStep {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

function InstructionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, initialize: initAuth } = useAuthStore();
  const { hasCompletedDiagnostic, checkExistingDiagnostic } = useExamStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isCheckingHistory, setIsCheckingHistory] = useState(false);
  
  const modo = searchParams.get('modo') || 'simulador_realista';
  const seccion = searchParams.get('seccion');
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checklist, setChecklist] = useState({
    time: false,
    fullscreen: false,
    understand: false
  });

  const config = modo === 'practica_area' 
    ? EXAM_CONFIGS.practica_area_20 
    : EXAM_CONFIGS[modo] || EXAM_CONFIGS.simulador_realista;

  const allChecked = Object.values(checklist).every(Boolean);

  // Initialize auth
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Check if user already completed diagnostic
  useEffect(() => {
    if (user && modo === 'simulador_realista') {
      setIsCheckingHistory(true);
      checkExistingDiagnostic().then(({ hasCompleted }) => {
        setIsCheckingHistory(false);
        if (hasCompleted) {
          // Redirect to results if already completed
          router.push('/resultados');
        }
      });
    }
  }, [user, modo, checkExistingDiagnostic, router]);

  const getModeTitle = () => {
    switch (modo) {
      case 'simulador_realista': return 'Diagnóstico Completo';
      case 'diagnostico_rapido': return 'Diagnóstico Rápido';
      case 'practica_area': return `Práctica: ${seccion}`;
      default: return 'Examen';
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours} horas`;
    return `${minutes} minutos`;
  };

  const instructions: InstructionStep[] = [
    {
      icon: Clock,
      title: "Control del Tiempo",
      description: `Dispones de ${formatDuration(config.maxTimeSeconds)} para completar ${config.questionCount} reactivos. El examen se enviará automáticamente cuando el tiempo termine.`,
      color: "text-blue-600",
      bgColor: "bg-blue-500"
    },
    {
      icon: LayoutGrid,
      title: "Panel de Navegación",
      description: "Puedes moverte libremente entre todas las preguntas. El panel lateral te muestra el estado de cada reactivo: respondidas, sin responder y marcadas.",
      color: "text-purple-600",
      bgColor: "bg-purple-500"
    },
    {
      icon: Flag,
      title: "Marca para Revisar",
      description: "¿Tienes dudas en una pregunta? Márcala con la bandera y continúa. Al final podrás revisar todas tus preguntas marcadas antes de enviar.",
      color: "text-amber-600",
      bgColor: "bg-amber-500"
    },
    {
      icon: Save,
      title: "Progreso Seguro",
      description: "Tu avance se guarda automáticamente. Si cierras el navegador accidentalmente, podrás retomar donde te quedaste.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-500"
    },
    {
      icon: AlertTriangle,
      title: "Ambiente de Prueba",
      description: "El simulador detecta si cambias de pestaña o sales de pantalla completa. Te recomendamos un ambiente libre de distracciones para mejores resultados.",
      color: "text-red-500",
      bgColor: "bg-red-500"
    }
  ];

  const handleNext = () => {
    if (isAnimating) return;
    
    if (currentStep < instructions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setShowChecklist(true);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (isAnimating || currentStep === 0) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => prev - 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleStart = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (e) {
      console.warn("Fullscreen request denied or failed", e);
    }

    const params = new URLSearchParams();
    params.set('modo', modo);
    if (seccion) params.set('seccion', seccion);
    router.push(`/examen?${params.toString()}`);
  };

  const CurrentIcon = instructions[currentStep]?.icon || Clock;

  // Show loading while checking history
  if (isCheckingHistory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#002B7A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Verificando historial...</p>
        </div>
      </div>
    );
  }

  // Checklist View
  if (showChecklist) {
    return (
      <>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        <main className="min-h-screen px-4 py-8 relative flex items-center justify-center">
          <div className="max-w-xl w-full relative z-10">
            {/* Back to instructions */}
            <button
              onClick={() => setShowChecklist(false)}
              className="inline-flex items-center gap-2 text-slate-500 hover:text-[#002B7A] transition-colors mb-8 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Ver instrucciones
            </button>

            <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-200 animate-scale-in">
              <div className="text-center mb-10">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-[#002B7A] mb-3">
                  ¿Listo para comenzar?
                </h2>
                <p className="text-slate-500">
                  Confirma que estás preparado para iniciar el examen
                </p>
              </div>

              {/* Important notice for diagnostic */}
              {modo === 'simulador_realista' && (
                <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-800 text-sm font-medium">Importante</p>
                    <p className="text-amber-700 text-xs mt-1">
                      Solo puedes realizar el diagnóstico una vez. Tus resultados se guardarán permanentemente.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-10">
                <label className="flex items-center gap-4 p-5 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all border-2 border-transparent hover:border-[#002B7A]/10 group">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    checklist.time ? "bg-emerald-500 border-emerald-500" : "border-slate-300"
                  )}>
                    {checklist.time && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={checklist.time}
                    onChange={(e) => setChecklist(prev => ({ ...prev, time: e.target.checked }))}
                    className="sr-only"
                  />
                  <span className={cn(
                    'text-base transition-colors font-medium',
                    checklist.time ? 'text-[#002B7A]' : 'text-slate-600'
                  )}>
                    Tengo {formatDuration(config.maxTimeSeconds)} disponibles sin interrupciones
                  </span>
                </label>

                <label className="flex items-center gap-4 p-5 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all border-2 border-transparent hover:border-[#002B7A]/10 group">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    checklist.fullscreen ? "bg-emerald-500 border-emerald-500" : "border-slate-300"
                  )}>
                    {checklist.fullscreen && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={checklist.fullscreen}
                    onChange={(e) => setChecklist(prev => ({ ...prev, fullscreen: e.target.checked }))}
                    className="sr-only"
                  />
                  <span className={cn(
                    'text-base transition-colors font-medium',
                    checklist.fullscreen ? 'text-[#002B7A]' : 'text-slate-600'
                  )}>
                    Acepto el modo de pantalla completa
                  </span>
                </label>

                <label className="flex items-center gap-4 p-5 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all border-2 border-transparent hover:border-[#002B7A]/10 group">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    checklist.understand ? "bg-emerald-500 border-emerald-500" : "border-slate-300"
                  )}>
                    {checklist.understand && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={checklist.understand}
                    onChange={(e) => setChecklist(prev => ({ ...prev, understand: e.target.checked }))}
                    className="sr-only"
                  />
                  <span className={cn(
                    'text-base transition-colors font-medium',
                    checklist.understand ? 'text-[#002B7A]' : 'text-slate-600'
                  )}>
                    Entendí las instrucciones y estoy listo
                  </span>
                </label>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleStart}
                  disabled={!allChecked}
                  className={cn(
                    'w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-lg transition-all',
                    allChecked
                      ? 'bg-[#002B7A] text-white hover:bg-[#001C42] shadow-xl hover:shadow-2xl hover:-translate-y-1'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  )}
                >
                  {allChecked ? (
                    <>
                      {user ? 'Iniciar Examen' : 'Iniciar Sesión para Comenzar'}
                      <ArrowRight className="w-6 h-6" />
                    </>
                  ) : (
                    'Completa la confirmación'
                  )}
                </button>
                {!user && allChecked && (
                   <p className="text-center text-sm text-amber-600 font-medium bg-amber-50 py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                     <Lock className="w-4 h-4" />
                     Se requiere inicio de sesión
                   </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Animated Instructions View
  return (
    <main className="min-h-screen px-4 py-8 relative flex flex-col">
      <div className="max-w-2xl w-full mx-auto relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#002B7A] transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Inicio
          </Link>
          
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="w-4 h-4 text-[#C59D5F]" />
            <span className="font-medium">{formatDuration(config.maxTimeSeconds)}</span>
            <span className="mx-2">•</span>
            <span className="font-medium">{config.questionCount} preguntas</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#002B7A] tracking-tight">
            {getModeTitle()}
          </h1>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {instructions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => !isAnimating && setCurrentStep(idx)}
              className={cn(
                "transition-all duration-500 rounded-full",
                idx === currentStep 
                  ? "w-10 h-3 bg-[#002B7A]" 
                  : idx < currentStep
                    ? "w-3 h-3 bg-[#C59D5F]"
                    : "w-3 h-3 bg-slate-300 hover:bg-slate-400"
              )}
            />
          ))}
        </div>

        {/* Instruction Card */}
        <div className="flex-1 flex items-center justify-center">
          <div 
            className={cn(
              "w-full max-w-lg transition-all duration-500 transform",
              isAnimating ? "opacity-0 scale-95 translate-y-4" : "opacity-100 scale-100 translate-y-0"
            )}
          >
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-200 text-center relative overflow-hidden">
              {/* Decorative Background */}
              <div className={cn(
                "absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2",
                instructions[currentStep].bgColor
              )} />
              
              {/* Icon */}
              <div className={cn(
                "relative w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8 transition-all duration-700",
                instructions[currentStep].bgColor.replace('bg-', 'bg-') + '/10'
              )}>
                <CurrentIcon className={cn("w-12 h-12 transition-all duration-500", instructions[currentStep].color)} />
                
                {/* Pulsing ring */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl animate-ping opacity-30",
                  instructions[currentStep].bgColor.replace('bg-', 'bg-') + '/20'
                )} />
              </div>

              {/* Content */}
              <h2 className="font-serif text-2xl font-bold text-[#002B7A] mb-4">
                {instructions[currentStep].title}
              </h2>
              
              <p className="text-slate-600 text-lg leading-relaxed mb-2">
                {instructions[currentStep].description}
              </p>

              {/* Step Counter */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <span className="text-sm text-slate-400 font-medium">
                  Paso {currentStep + 1} de {instructions.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-12 pb-8">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0 || isAnimating}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all",
              currentStep === 0
                ? "text-slate-300 cursor-not-allowed"
                : "text-slate-600 hover:text-[#002B7A] hover:bg-slate-100"
            )}
          >
            <ArrowLeft className="w-5 h-5" />
            Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={isAnimating}
            className={cn(
              "flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg",
              currentStep === instructions.length - 1
                ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-xl"
                : "bg-[#002B7A] text-white hover:bg-[#001C42] hover:shadow-xl"
            )}
          >
            {currentStep === instructions.length - 1 ? (
              <>
                Continuar
                <CheckCircle2 className="w-6 h-6" />
              </>
            ) : (
              <>
                Siguiente
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

export default function InstruccionesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#002B7A] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <InstructionsContent />
    </Suspense>
  );
}
