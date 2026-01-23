import React, { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { IconSparkles, IconTarget } from '../ui/Icons';
import { Mail, Lock, AlertCircle, X, ChevronRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signInWithPassword } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await signInWithPassword(email, password);
      if (signInError) throw signInError;
      onClose();
    } catch (err: any) {
      if (err.message === 'Invalid login credentials') {
        setError('Credenciales no válidas. Por favor verifica.');
      } else {
        setError(err.message || 'Error de conexión');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with strong blur and tint */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Minimal Header */}
        <div className="pt-10 pb-6 px-8 text-center">
          <div className="w-16 h-16 bg-[#002B7A] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-900/20 rotate-3 transform hover:rotate-6 transition-transform duration-300">
            <IconSparkles className="w-8 h-8 text-[#C59D5F]" />
          </div>
          
          <h2 className="font-serif text-2xl font-bold text-[#002B7A] mb-2">
            Bienvenido
          </h2>
          <p className="text-slate-500 text-sm">
            Accede con tus credenciales para continuar
          </p>
        </div>

        {/* Form */}
        <div className="px-8 pb-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                Correo
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400 group-focus-within:text-[#002B7A] transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#002B7A]/20 focus:border-[#002B7A] sm:text-sm transition-all outline-none"
                  placeholder="usuario@ejemplo.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-[#002B7A] transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#002B7A]/20 focus:border-[#002B7A] sm:text-sm transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium flex items-center gap-2 animate-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#002B7A] hover:bg-[#002366] text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Iniciar Sesión
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-xs text-slate-400 hover:text-[#002B7A] transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
