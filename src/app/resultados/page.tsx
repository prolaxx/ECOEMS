'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useExamStore } from '@/store/examStore';
import { useAuthStore } from '@/store/authStore';
import { ScoreSummary } from '@/components/results/ScoreSummary';
import { SectionChart } from '@/components/results/SectionChart';
import { PriorityList } from '@/components/results/PriorityList';
import { StudyPlan } from '@/components/results/StudyPlan';
import { MistakesList } from '@/components/results/MistakesList';
import { SubtopicGrid } from '@/components/results/SubtopicGrid';
import { 
  Home, 
  Download, 
  AlertCircle,
  ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'resumen' | 'areas' | 'prioridades' | 'plan' | 'errores';

function ResultsContent() {
  const router = useRouter();
  const { results, loadResultsFromHistory } = useExamStore();
  const { user, initialize: initAuth } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>('resumen');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedResults, setLoadedResults] = useState(results);

  // Initialize auth on mount
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Admin-only guard
  useEffect(() => {
    const currentUser = useAuthStore.getState().user;
    if (currentUser && currentUser.role !== 'admin') {
      router.push('/');
      return;
    }
    if (!currentUser) {
      // Give a moment for auth to rehydrate
      const timer = setTimeout(() => {
        const u = useAuthStore.getState().user;
        if (!u || u.role !== 'admin') {
          router.push('/');
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [router]);

  // Load results (from store or from DB)
  useEffect(() => {
    const loadResults = async () => {
      if (results) {
        setLoadedResults(results);
        setIsLoading(false);
        return;
      }

      if (user?.role === 'admin') {
        const dbResults = await loadResultsFromHistory();
        if (dbResults) {
          setLoadedResults(dbResults);
        }
      }
      setIsLoading(false);
    };

    loadResults();
  }, [results, user, loadResultsFromHistory]);

  // Redirect to admin panel if no results and not loading
  useEffect(() => {
    if (!isLoading && !loadedResults && user?.role === 'admin') {
      router.push('/admin');
    }
  }, [isLoading, loadedResults, router, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#002B7A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Cargando resultados...</p>
        </div>
      </div>
    );
  }

  if (!loadedResults) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#002B7A] mb-2 font-serif">Sin resultados</h2>
          <p className="text-slate-600 mb-6">No hay resultados disponibles para mostrar.</p>
          <Link
            href="/admin"
            className="btn-secondary px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2"
          >
            Volver al Panel Admin
          </Link>
        </div>
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const { generatePDF } = await import('@/components/pdf/PdfGenerator');
      await generatePDF(loadedResults);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor intenta de nuevo.');
    }
    setIsGeneratingPDF(false);
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'resumen', label: 'Resumen General' },
    { id: 'areas', label: 'Desglose por Áreas' },
    { id: 'prioridades', label: 'Prioridades' },
    { id: 'plan', label: 'Plan de Estudio' },
    { id: 'errores', label: 'Revisión de Errores' }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="p-2 rounded-lg text-slate-500 hover:text-[#002B7A] hover:bg-slate-100 transition-colors"
                title="Volver al Panel Admin"
              >
                <Home className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#002B7A]">
                  Resultados del Diagnóstico
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Vista de administrador — Análisis completo del desempeño
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm',
                  isGeneratingPDF 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-[#002B7A] text-white hover:bg-[#001C42] hover:shadow-md'
                )}
              >
                {isGeneratingPDF ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Descargar PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-[#002B7A]/10 text-[#002B7A]'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                )}
              >
                {tab.label}
                {tab.id === 'errores' && (
                  <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-bold">
                    {loadedResults.mistakes.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-8 relative z-10">
        <div className="space-y-8 animate-fade-in">
          {activeTab === 'resumen' && (
            <>
              <ScoreSummary results={loadedResults} />
              <div className="grid lg:grid-cols-2 gap-8">
                <SectionChart sections={loadedResults.bySection} />
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                  <h3 className="font-serif text-xl font-bold text-[#002B7A] mb-4">Recomendación Prioritaria</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Para maximizar tu puntaje en el menor tiempo posible, te recomendamos iniciar tu estudio con estos temas de alto impacto:
                  </p>
                  <div className="space-y-3">
                    {loadedResults.priorities.slice(0, 3).map((p, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#C59D5F]/30 transition-colors">
                        <span className="w-8 h-8 rounded-full bg-[#002B7A] text-white flex items-center justify-center text-sm font-bold shadow-sm">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-[#002B7A] font-semibold text-sm">{p.subtopic}</p>
                          <p className="text-slate-500 text-xs mt-0.5">{p.section}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'areas' && (
            <>
              <SectionChart sections={loadedResults.bySection} />
              <SubtopicGrid subtopics={loadedResults.bySubtopic} />
            </>
          )}

          {activeTab === 'prioridades' && (
            <PriorityList priorities={loadedResults.priorities} />
          )}

          {activeTab === 'plan' && (
            <StudyPlan 
              plan4w={loadedResults.studyPlan4w} 
              plan8w={loadedResults.studyPlan8w} 
            />
          )}

          {activeTab === 'errores' && (
            <MistakesList mistakes={loadedResults.mistakes} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-16 bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-slate-500 hover:text-[#002B7A] transition-colors text-sm font-medium"
          >
            <Home className="w-4 h-4" />
            Volver al Panel Admin
          </Link>
          
          <p className="text-slate-400 text-sm">
            Examen completado el {new Date(loadedResults.completedAt).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function ResultadosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-[#002B7A] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
