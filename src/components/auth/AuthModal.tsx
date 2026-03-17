'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { IconSparkles } from '../ui/Icons';
import { Mail, Lock, AlertCircle, X, ChevronRight, ArrowLeft, KeyRound, UserCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'email' | 'login' | 'create';

interface CheckResult {
  exists: boolean;
  hasPassword: boolean;
  isAdmin?: boolean;
  name?: string;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signInWithPassword } = useAuthStore();

  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setStep('email');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    onClose();
  };

  // Step 1: check email
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/auth/check?email=${encodeURIComponent(email.trim().toLowerCase())}`);
      const data: CheckResult = await res.json();

      if (!data.exists) {
        // Unknown email — not pre-registered
        setError('Este correo no está registrado en el sistema. Contacta a tu administrador.');
        setLoading(false);
        return;
      }

      if (data.name) setUserName(data.name);

      if (data.hasPassword) {
        setStep('login');
      } else {
        setStep('create');
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2a: existing user — just enter password
  // Step 2b: first time — create password
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step === 'create') {
      if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }
    }

    setLoading(true);
    try {
      const { error: signInError } = await signInWithPassword(email.trim().toLowerCase(), password);
      if (signInError) {
        setError(signInError.message || 'Credenciales inválidas. Verifica tu contraseña.');
      } else {
        handleClose();
      }
    } catch (err: any) {
      setError(err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const isFirstTime = step === 'create';
  const displayName = userName || email.split('@')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Card */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Top accent bar */}
        <div className={`h-1.5 ${isFirstTime ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-[#002B7A] to-[#0044C8]'}`} />

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pt-8 pb-5 px-8 text-center">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl rotate-3 transition-transform duration-300 hover:rotate-6 ${isFirstTime ? 'bg-emerald-500' : 'bg-[#002B7A]'}`}>
            {isFirstTime
              ? <KeyRound className="w-8 h-8 text-white" />
              : <IconSparkles className="w-8 h-8 text-[#C59D5F]" />
            }
          </div>

          {step === 'email' && (
            <>
              <h2 className="font-serif text-2xl font-bold text-[#002B7A] mb-1">Bienvenido</h2>
              <p className="text-slate-500 text-sm">Ingresa tu correo para continuar</p>
            </>
          )}
          {step === 'login' && (
            <>
              <h2 className="font-serif text-2xl font-bold text-[#002B7A] mb-1">
                Hola, {displayName}
              </h2>
              <p className="text-slate-500 text-sm">Ingresa tu contraseña para acceder</p>
            </>
          )}
          {step === 'create' && (
            <>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-2">
                <UserCheck className="w-3.5 h-3.5" />
                Primera vez
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#002B7A] mb-1">
                Crea tu contraseña
              </h2>
              <p className="text-slate-500 text-sm">
                Hola <span className="font-semibold text-slate-700">{displayName}</span>, establece una contraseña para tu cuenta
              </p>
            </>
          )}
        </div>

        {/* Form */}
        <div className="px-8 pb-8">

          {/* Step 1: Email */}
          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                  Correo electrónico
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400 group-focus-within:text-[#002B7A] transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#002B7A]/20 focus:border-[#002B7A] sm:text-sm transition-all outline-none"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#002B7A] hover:bg-[#002366] text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-1"
              >
                {loading
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <>Continuar <ChevronRight className="w-4 h-4 opacity-50" /></>
                }
              </button>
            </form>
          )}

          {/* Step 2: Login or Create password */}
          {(step === 'login' || step === 'create') && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {/* Show email (read-only) */}
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-sm">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{email}</span>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                  {isFirstTime ? 'Nueva contraseña' : 'Contraseña'}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-[#002B7A] transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#002B7A]/20 focus:border-[#002B7A] sm:text-sm transition-all outline-none"
                    placeholder={isFirstTime ? 'Mínimo 6 caracteres' : '••••••••'}
                    minLength={isFirstTime ? 6 : undefined}
                  />
                </div>
              </div>

              {/* Confirm password — only for first time */}
              {isFirstTime && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                    Confirmar contraseña
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                    </div>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 sm:text-sm transition-all outline-none"
                      placeholder="Repite tu contraseña"
                    />
                  </div>
                  <p className="text-xs text-slate-400 ml-1">
                    Esta contraseña quedará guardada permanentemente para tu cuenta.
                  </p>
                </div>
              )}

              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => { setStep('email'); setPassword(''); setConfirmPassword(''); setError(null); }}
                  className="p-3 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${isFirstTime ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20' : 'bg-[#002B7A] hover:bg-[#002366] shadow-blue-900/20'}`}
                >
                  {loading
                    ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : isFirstTime
                      ? <><KeyRound className="w-4 h-4" /> Crear contraseña y entrar</>
                      : <>Iniciar Sesión <ChevronRight className="w-4 h-4 opacity-50" /></>
                  }
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
