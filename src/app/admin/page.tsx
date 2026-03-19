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
  UserPlus,
  Trash2,
  X,
  Mail,
  User,
  AlertCircle,
  BarChart3,
  UserCheck,
  LogIn,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

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

interface UserSummary {
  id: string;
  email: string;
  role: string;
  user_metadata?: { full_name?: string };
  createdAt: string;
  lastLogin?: string;
  hasPassword: boolean;
  hasDiagnostic: boolean;
  diagnosticScore?: number;
  diagnosticGrade?: string;
  diagnosticCompletedAt?: string;
}

type ActiveView = 'resultados' | 'usuarios';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function gradeColor(grade: string) {
  switch (grade) {
    case 'Excelente': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Bueno':     return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Regular':   return 'bg-amber-100 text-amber-700 border-amber-200';
    default:          return 'bg-red-100 text-red-700 border-red-200';
  }
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// ─── Add User Modal ────────────────────────────────────────────────────────────

interface AddUserModalProps {
  onClose: () => void;
  onSuccess: () => void;
  token: string;
}

function AddUserModal({ onClose, onSuccess, token }: AddUserModalProps) {
  const [email, setEmail]     = useState('');
  const [name, setName]       = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: email.trim(), full_name: name.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al crear el usuario');
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1200);
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#002B7A] to-[#0044C8]" />

        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#002B7A]/10 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-[#002B7A]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#002B7A]">Agregar Usuario</h3>
                <p className="text-slate-500 text-xs">Pre-registra a un alumno en el sistema</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {success ? (
            <div className="flex flex-col items-center py-6 gap-3 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <p className="font-semibold text-emerald-700">¡Usuario registrado!</p>
              <p className="text-slate-500 text-sm">El alumno ya puede acceder al simulador.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Nombre completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. María García López"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#002B7A]/20 focus:border-[#002B7A] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Correo electrónico <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alumno@ejemplo.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#002B7A]/20 focus:border-[#002B7A] transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <p className="text-xs text-slate-400 bg-slate-50 rounded-xl p-3 border border-slate-100">
                El alumno recibirá acceso al simulador con este correo. La primera vez que ingrese,
                podrá crear su propia contraseña.
              </p>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#002B7A] hover:bg-[#001C42] text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Registrar Alumno
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Page ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();
  const { user, session, signOut } = useAuthStore();

  const [diagnostics, setDiagnostics]         = useState<DiagnosticSummary[]>([]);
  const [allUsers, setAllUsers]               = useState<UserSummary[]>([]);
  const [filteredDiag, setFilteredDiag]       = useState<DiagnosticSummary[]>([]);
  const [filteredUsers, setFilteredUsers]     = useState<UserSummary[]>([]);
  const [isLoading, setIsLoading]             = useState(true);
  const [search, setSearch]                   = useState('');
  const [downloadingId, setDownloadingId]     = useState<string | null>(null);
  const [deletingId, setDeletingId]           = useState<string | null>(null);
  const [activeView, setActiveView]           = useState<ActiveView>('usuarios');
  const [showAddModal, setShowAddModal]       = useState(false);

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

  // Fetch all data
  const fetchAll = async () => {
    const token = useAuthStore.getState().session?.access_token;
    if (!token) return;
    setIsLoading(true);
    try {
      const [diagRes, usersRes] = await Promise.all([
        fetch('/api/admin/diagnostics', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/users',       { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (diagRes.ok) {
        const data = await diagRes.json();
        setDiagnostics(data.diagnostics || []);
        setFilteredDiag(data.diagnostics || []);
      }
      if (usersRes.ok) {
        const data = await usersRes.json();
        setAllUsers(data.users || []);
        setFilteredUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') fetchAll();
  }, [user]);

  // Search filter
  useEffect(() => {
    const q = search.toLowerCase().trim();
    if (!q) {
      setFilteredDiag(diagnostics);
      setFilteredUsers(allUsers);
      return;
    }
    setFilteredDiag(
      diagnostics.filter(
        (d) =>
          d.userInfo?.email?.toLowerCase().includes(q) ||
          d.userInfo?.user_metadata?.full_name?.toLowerCase().includes(q) ||
          d.userId.toLowerCase().includes(q)
      )
    );
    setFilteredUsers(
      allUsers.filter(
        (u) =>
          u.email.toLowerCase().includes(q) ||
          u.user_metadata?.full_name?.toLowerCase().includes(q)
      )
    );
  }, [search, diagnostics, allUsers]);

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

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`¿Eliminar a "${userName}" y todos sus datos? Esta acción no se puede deshacer.`)) return;
    const token = useAuthStore.getState().session?.access_token;
    if (!token) return;
    setDeletingId(userId);
    try {
      const res = await fetch(`/api/admin/users?userId=${encodeURIComponent(userId)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchAll();
      } else {
        alert('Error al eliminar el usuario.');
      }
    } catch {
      alert('Error de conexión.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  // Stats
  const totalRegistered  = allUsers.length;
  const totalLoggedIn    = allUsers.filter((u) => u.lastLogin).length;
  const totalCompleted   = allUsers.filter((u) => u.hasDiagnostic).length;
  const avgScore =
    diagnostics.length > 0
      ? Math.round(diagnostics.reduce((s, d) => s + (d.results?.percent || 0), 0) / diagnostics.length)
      : 0;

  const token = session?.access_token || '';

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
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#C59D5F] hover:bg-[#b08a4a] text-white text-sm font-semibold transition-colors shadow"
            >
              <UserPlus className="w-4 h-4" />
              Agregar Alumno
            </button>
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
              <span className="text-slate-500 text-sm font-medium">Registrados</span>
            </div>
            <p className="text-3xl font-bold text-[#002B7A]">{totalRegistered}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                <LogIn className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-slate-500 text-sm font-medium">Han Ingresado</span>
            </div>
            <p className="text-3xl font-bold text-indigo-600">{totalLoggedIn}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-slate-500 text-sm font-medium">Completaron</span>
            </div>
            <p className="text-3xl font-bold text-emerald-600">{totalCompleted}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-slate-500 text-sm font-medium">Promedio</span>
            </div>
            <p className="text-3xl font-bold text-amber-600">{avgScore}%</p>
          </div>
        </div>

        {/* View Tabs + Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Tabs */}
            <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setActiveView('usuarios')}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all',
                  activeView === 'usuarios'
                    ? 'bg-white text-[#002B7A] shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                )}
              >
                <UserCheck className="w-4 h-4" />
                Alumnos
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-[#002B7A]/10 text-[#002B7A] font-bold">
                  {allUsers.length}
                </span>
              </button>
              <button
                onClick={() => setActiveView('resultados')}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all',
                  activeView === 'resultados'
                    ? 'bg-white text-[#002B7A] shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                )}
              >
                <BarChart3 className="w-4 h-4" />
                Resultados
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-700 font-bold">
                  {diagnostics.length}
                </span>
              </button>
            </div>

            {/* Search + actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar alumno..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#002B7A]/20 focus:border-[#002B7A] w-full sm:w-56 transition-all"
                />
              </div>
              <button
                onClick={fetchAll}
                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-[#002B7A] hover:border-[#002B7A] transition-colors"
                title="Actualizar"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="sm:hidden flex items-center gap-1 p-2 rounded-lg border border-[#C59D5F] text-[#C59D5F] hover:bg-[#C59D5F]/10 transition-colors"
                title="Agregar alumno"
              >
                <UserPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── USUARIOS view ─────────────────────────────────────────────── */}
          {activeView === 'usuarios' && (
            <>
              {isLoading ? (
                <LoadingState label="Cargando alumnos..." />
              ) : filteredUsers.length === 0 ? (
                <EmptyState
                  search={search}
                  emptyLabel="Aún no hay alumnos registrados"
                  emptyHint="Usa el botón «Agregar Alumno» para registrar a tus alumnos"
                  searchHint="Intenta con otro término de búsqueda"
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Alumno
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                          Registrado
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                          Último acceso
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUsers.map((u) => {
                        const name = u.user_metadata?.full_name || u.email.split('@')[0];
                        const status = u.hasDiagnostic
                          ? { label: 'Completó examen', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' }
                          : u.lastLogin
                          ? { label: 'Ingresó al sistema', cls: 'bg-blue-100 text-blue-700 border-blue-200' }
                          : u.hasPassword
                          ? { label: 'Configuró cuenta', cls: 'bg-indigo-100 text-indigo-700 border-indigo-200' }
                          : { label: 'Sin acceder', cls: 'bg-slate-100 text-slate-500 border-slate-200' };

                        return (
                          <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#002B7A]/10 flex items-center justify-center shrink-0">
                                  <User className="w-4 h-4 text-[#002B7A]" />
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-800 text-sm">{name}</p>
                                  <p className="text-slate-400 text-xs mt-0.5 truncate max-w-[180px]">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                              <span className="text-slate-500 text-sm">{formatDate(u.createdAt)}</span>
                            </td>
                            <td className="px-6 py-4 hidden lg:table-cell">
                              {u.lastLogin ? (
                                <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                                  <Clock className="w-3.5 h-3.5" />
                                  {formatDate(u.lastLogin)}
                                </div>
                              ) : (
                                <span className="text-slate-300 text-sm">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold border', status.cls)}>
                                {status.label}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                {u.hasDiagnostic && (
                                  <Link
                                    href={`/admin/resultados/${u.id}`}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#002B7A]/5 hover:bg-[#002B7A]/10 text-[#002B7A] text-xs font-semibold transition-colors border border-[#002B7A]/10"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    Ver
                                    <ChevronRight className="w-3 h-3 opacity-50" />
                                  </Link>
                                )}
                                <button
                                  onClick={() => handleDeleteUser(u.id, name)}
                                  disabled={deletingId === u.id}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors border border-red-200 disabled:opacity-50"
                                >
                                  {deletingId === u.id ? (
                                    <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    <Trash2 className="w-3.5 h-3.5" />
                                  )}
                                  Eliminar
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
              {filteredUsers.length > 0 && (
                <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 text-xs text-slate-400 text-right">
                  {filteredUsers.length} alumno{filteredUsers.length !== 1 ? 's' : ''}
                  {search ? ` de ${allUsers.length}` : ''}
                </div>
              )}
            </>
          )}

          {/* ── RESULTADOS view ───────────────────────────────────────────── */}
          {activeView === 'resultados' && (
            <>
              {isLoading ? (
                <LoadingState label="Cargando resultados..." />
              ) : filteredDiag.length === 0 ? (
                <EmptyState
                  search={search}
                  emptyLabel="Aún no hay diagnósticos registrados"
                  emptyHint="Los resultados aparecerán aquí cuando los alumnos completen su examen"
                  searchHint="Intenta con otro término de búsqueda"
                />
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
                      {filteredDiag.map((d) => {
                        const name =
                          d.userInfo?.user_metadata?.full_name ||
                          d.userInfo?.email?.split('@')[0] ||
                          'Sin nombre';
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
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#002B7A]/10 flex items-center justify-center shrink-0">
                                  <User className="w-4 h-4 text-[#002B7A]" />
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-800 text-sm">{name}</p>
                                  <p className="text-slate-400 text-xs mt-0.5 truncate max-w-[180px]">{email}</p>
                                </div>
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
                                <span
                                  className={cn(
                                    'px-2.5 py-1 rounded-full text-xs font-semibold border',
                                    gradeColor(d.results.grade)
                                  )}
                                >
                                  {d.results.grade}
                                </span>
                              ) : (
                                '—'
                              )}
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
              {filteredDiag.length > 0 && (
                <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 text-xs text-slate-400 text-right">
                  {filteredDiag.length} resultado{filteredDiag.length !== 1 ? 's' : ''}
                  {search ? ` de ${diagnostics.length}` : ''}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Add User Modal */}
      {showAddModal && (
        <AddUserModal
          token={token}
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchAll}
        />
      )}
    </div>
  );
}

// ─── Tiny reusable sub-components ─────────────────────────────────────────────

function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-[#002B7A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-500 text-sm">{label}</p>
      </div>
    </div>
  );
}

function EmptyState({
  search,
  emptyLabel,
  emptyHint,
  searchHint,
}: {
  search: string;
  emptyLabel: string;
  emptyHint: string;
  searchHint: string;
}) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500 font-medium">{search ? 'Sin coincidencias' : emptyLabel}</p>
        <p className="text-slate-400 text-sm mt-1">{search ? searchHint : emptyHint}</p>
      </div>
    </div>
  );
}
