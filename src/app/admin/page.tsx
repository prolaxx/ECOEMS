'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import {
  Users,
  FileText,
  Download,
  Eye,
  LogOut,
  CheckCircle2,
  Clock,
  TrendingUp,
  Search,
  RefreshCw,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiagnosticSummary {
  userId: string;
  mode: string;
  attemptId: string;
  updatedAt: string;
  createdAt: string;
  results: {
    score: number;
    totalQuestions: number;
    correct: number;
    percent: number;
    grade: string;
    message: string;
    completedAt: string;
    totalTimeSec: number;
  };
  userInfo?: {
    email: string;
    user_metadata?: { full_name?: string };
  };
}

function gradeColor(grade: string) {
  switch (grade) {
    case 'Excelente': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Bueno': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Regular': return 'bg-amber-100 text-amber-700 border-amber-200';
    default: return 'bg-red-100 text-red-700 border-red-200';
  }
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function AdminPage() {
  const router = useRouter();
  const { user, session, signOut } = useAuthStore();
  const [diagnostics, setDiagnostics] = useState<DiagnosticSummary[]>([]);
  const [filtered, setFiltered] = useState<DiagnosticSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

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
    if (u.role !== 'admin') {
      router.push('/');
    }
  }, [router]);

  const fetchDiagnostics = async () => {
    const token = useAuthStore.getState().session?.access_token;
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/diagnostics', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setDiagnostics(data.diagnostics || []);
        setFiltered(data.diagnostics || []);
      }
    } catch (error) {
      console.error('Error fetching diagnostics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchDiagnostics();
    }
  }, [user]);

  // Search filter
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(diagnostics);
      return;
    }
    const q = search.toLowerCase();
    setFiltered(
      diagnostics.filter(
        (d) =>
          d.userInfo?.email?.toLowerCase().includes(q) ||
          d.userInfo?.user_metadata?.full_name?.toLowerCase().includes(q) ||
          d.userId.toLowerCase().includes(q)
      )
    );
  }, [search, diagnostics]);

  const handleDownloadPDF = async (diagnostic: DiagnosticSummary) => {
    const token = useAuthStore.getState().session?.access_token;
    if (!token) return;

    setDownloadingId(diagnostic.userId);
    try {
      const response = await fetch(
        `/api/admin/diagnostics?userId=${encodeURIComponent(diagnostic.userId)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.diagnostic?.results) {
          const { generatePDF } = await import('@/components/pdf/PdfGenerator');
          await generatePDF(data.diagnostic.results);
        }
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Intenta de nuevo.');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const avgScore =
    diagnostics.length > 0
      ? Math.round(diagnostics.reduce((s, d) => s + (d.results?.percent || 0), 0) / diagnostics.length)
      : 0;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-[#002B7A] text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#C59D5F]" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg leading-none">Panel de Administrador</span>
              <p className="text-white/60 text-xs">ECOEMS — Sistema de Diagnóstico</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/70 text-sm hidden sm:block">
              {user.user_metadata?.full_name || user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#002B7A]" />
              </div>
              <span className="text-slate-500 text-sm font-medium">Total Alumnos</span>
            </div>
            <p className="text-3xl font-bold text-[#002B7A]">{diagnostics.length}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-slate-500 text-sm font-medium">Completados</span>
            </div>
            <p className="text-3xl font-bold text-emerald-600">{diagnostics.length}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-slate-500 text-sm font-medium">Promedio General</span>
            </div>
            <p className="text-3xl font-bold text-amber-600">{avgScore}%</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-slate-500 text-sm font-medium">Diagnósticos</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">{diagnostics.length}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Table header */}
          <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="font-serif text-xl font-bold text-[#002B7A]">
              Resultados de Alumnos
            </h2>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar alumno..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#002B7A]/20 focus:border-[#002B7A] w-full sm:w-56"
                />
              </div>
              <button
                onClick={fetchDiagnostics}
                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-[#002B7A] hover:border-[#002B7A] transition-colors"
                title="Actualizar"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-10 h-10 border-4 border-[#002B7A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-slate-500 text-sm">Cargando resultados...</p>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">
                  {search ? 'Sin coincidencias' : 'Aún no hay diagnósticos registrados'}
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  {search ? 'Intenta con otro término de búsqueda' : 'Los resultados aparecerán aquí cuando los alumnos completen su examen'}
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Alumno
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                      Fecha
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Puntaje
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                      Tiempo
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Calificación
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((d) => {
                    const name = d.userInfo?.user_metadata?.full_name || d.userInfo?.email?.split('@')[0] || 'Sin nombre';
                    const email = d.userInfo?.email || d.userId;
                    const dateStr = d.results?.completedAt
                      ? new Date(d.results.completedAt).toLocaleDateString('es-MX', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—';

                    return (
                      <tr key={d.userId} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-slate-800 text-sm">{name}</p>
                            <p className="text-slate-400 text-xs mt-0.5 truncate max-w-[180px]">{email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                            <Clock className="w-3.5 h-3.5" />
                            {dateStr}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <span className="text-lg font-bold text-[#002B7A]">
                              {d.results?.correct ?? '—'}
                            </span>
                            <span className="text-slate-400 text-sm">
                              /{d.results?.totalQuestions ?? '—'}
                            </span>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {d.results?.percent != null ? `${d.results.percent}%` : ''}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <span className="text-slate-500 text-sm">
                            {d.results?.totalTimeSec ? formatTime(d.results.totalTimeSec) : '—'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {d.results?.grade ? (
                            <span className={cn(
                              'px-2.5 py-1 rounded-full text-xs font-semibold border',
                              gradeColor(d.results.grade)
                            )}>
                              {d.results.grade}
                            </span>
                          ) : '—'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/resultados/${d.userId}`}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#002B7A]/5 hover:bg-[#002B7A]/10 text-[#002B7A] text-xs font-semibold transition-colors border border-[#002B7A]/10"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Ver
                              <ChevronRight className="w-3 h-3 opacity-50" />
                            </Link>
                            <button
                              onClick={() => handleDownloadPDF(d)}
                              disabled={downloadingId === d.userId}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold transition-colors border border-emerald-200 disabled:opacity-50"
                            >
                              {downloadingId === d.userId ? (
                                <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Download className="w-3.5 h-3.5" />
                              )}
                              PDF
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {filtered.length > 0 && (
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 text-xs text-slate-400 text-right">
              {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
              {search ? ` de ${diagnostics.length}` : ''}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
