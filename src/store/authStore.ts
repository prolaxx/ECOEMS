import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email?: string;
  role?: 'user' | 'admin';
  user_metadata?: {
    full_name?: string;
    [key: string]: any;
  };
}

export interface Session {
  user: User;
  access_token: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;

  // Computed
  isAdmin: boolean;

  // Actions
  initialize: () => Promise<void>;
  signIn: (email: string) => Promise<{ error: any }>;
  signInWithOtp: (email: string) => Promise<{ error: any }>;
  signInWithPassword: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: false,

      get isAdmin() {
        return get().user?.role === 'admin';
      },

      initialize: async () => {
        set({ isLoading: false });
      },

      signIn: async (email: string) => {
        try {
          const response = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
          if (response.ok) {
            const data = await response.json();
            const { session } = data;
            set({ user: session.user, session });
            return { error: null };
          }
          const data = await response.json();
          return { error: { message: data.error || 'Error al iniciar sesión' } };
        } catch (error) {
          return { error };
        }
      },

      signInWithOtp: async (email: string) => {
        return get().signIn(email);
      },

      signInWithPassword: async (email: string, password: string) => {
        try {
          const response = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          if (response.ok) {
            const data = await response.json();
            const { session } = data;
            set({ user: session.user, session });
            return { error: null };
          }
          const data = await response.json();
          return { error: { message: data.error || 'Credenciales inválidas' } };
        } catch (error) {
          return { error };
        }
      },

      signOut: async () => {
        set({ user: null, session: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
