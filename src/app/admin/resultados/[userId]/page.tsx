'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { ScoreSummary } from '@/components/results/ScoreSummary';
import { SectionChart } from '@/components/results/SectionChart';
import { PriorityList } from '@/components/results/PriorityList';
import { StudyPlan } from '@/components/results/StudyPlan';
import { MistakesList } from '@/components/results/MistakesList';
import { SubtopicGrid } from '@/components/results/SubtopicGrid';
import type { ExamResults } from '@/types/exam';
import {
  ArrowLeft,
  Download,
  AlertCircle,
  User,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'resumen' | 'areas' | 'prioridades' | 'plan' | 'errores';

function AdminResultsContent() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const userId = params.userId as string;

  const [results, setResults] = useState<ExamResults | null>(null);
  const [userInfo, setUserInfo] = useState<{ email?: string; user_metadata?: { full_name?: string } } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('resumen');

  // Admin-only guard
  useEffect(() => {
    const u = useAuthStore.getState().user;
    if (!u) {
      const timer = setTimeout(() => {
        const u2 = useAuthStore.getState().user;
        if (!u2 || u2.role !== 'admin') router.push('/');
      }, 400);
      return () => clearTimeout(timer);
    }
    if (u.role !== 'admin') router.push('/');
  }, [router]);

  // Load this user's diagnostic
  useEffect(() => {
    if (!userId || !user || user.role !== 'admin') return;

    const token = useAuthStore.getState().session?.access_token;
    if (!token) return;

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/admin/diagnostics?userId=${encodeURIComponent(userId)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.diagnostic?.results) {
            setResults(data.diagnostic.results);
            setUserInfo(data.diagnostic.user || null);
          }
        }
      } catch (error) {
        console.error('Error loading results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [userId, user]);

  const handleDownloadPDF = async () => {
    if (!results) return;
    setIsGeneratingPDF(true);
    try {
      const { generatePDF } = await import('@/components/pdf/PdfGenerator');
      await generatePDF(results);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor intenta de nuevo.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'resumen', label: 'Resumen General' },
    { id: 'areas', label: 'Desglose por Áreas' },
    { id: 'prioridades', label: 'Prioridades' },
    { id: 'plan', label: 'Plan de Estudio' },
    { id: 'errores', label: 'Revisión de Errores' },
  ];

  const studentName =
    userInfo?.user_metadata?.full_name ||
    userInfo?.email?.split('@')[0] ||
    userId;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#002B7A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Cargando resultados del alumno...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#002B7A] mb-2 font-serif">Sin resultados</h2>
          <p className="text-slate-600 mb-6">No se encontraron resultados para este alumno.</p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#002B7A] text-white rounded-xl font-semibold hover:bg-[#001C42] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Panel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#002B7A] text-white shadow-xl">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Volver al Panel"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#C59D5F]" />
                  <span className="text-white/60 text-xs font-medium uppercase tracking-wider">Vista de Administrador</span>
                </div>
                <h1 className="font-serif text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-white/60" />
                  {studentName}
                </h1>
                {userInfo?.email && (
                  <p className="text-white/50 text-xs mt-0.5">{userInfo.email}</p>
                )}
              </div>
            </div>

            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm',
                isGeneratingPDF
                  ? 'bg-white/10 text-white/40 cursor-not-allowed'
                  : 'bg-white text-[#002B7A] hover:bg-white/90 hover:shadow-md'
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
                  Descargar PDF
                </>
              )}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                )}
              >
                {tab.label}
                {tab.id === 'errores' && (
                  <span className="ml-2 px-2 py-0.5 bg-red-500/20 text-red-200 rounded-full text-xs font-bold">
                    {results.mistakes.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
        <div className="space-y-8 animate-fade-in">
          {activeTab === 'resumen' && (
            <>
              <ScoreSummary results={results} />
              <div className="grid lg:grid-cols-2 gap-8">
                <SectionChart sections={results.bySection} />
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                  <h3 className="font-serif text-xl font-bold text-[#002B7A] mb-4">Recomendación Prioritaria</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Temas de alto impacto donde el alumno debe enfocar su estudio:
                  </p>
                  <div className="space-y-3">
                    {results.priorities.slice(0, 3).map((p, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
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
              <SectionChart sections={results.bySection} />
              <SubtopicGrid subtopics={results.bySubtopic} />
            </>
          )}

          {activeTab === 'prioridades' && (
            <PriorityList priorities={results.priorities} />
          )}

          {activeTab === 'plan' && (
            <StudyPlan
              plan4w={results.studyPlan4w}
              plan8w={results.studyPlan8w}
            />
          )}

          {activeTab === 'errores' && (
            <MistakesList mistakes={results.mistakes} />
          )}
        </div>
      </main>
    </div>
  );
}

export default function AdminUserResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-[#002B7A] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AdminResultsContent />
    </Suspense>
  );
}
