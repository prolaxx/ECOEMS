import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// User types for MongoDB auth
export interface User {
  id: string;
  email?: string;
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
          } else {
            return { error: { message: 'Sign in failed' } };
          }
        } catch (error) {
          console.error('Sign in error:', error);
          return { error };
        }
      },
      
      signInWithOtp: async (email: string) => {
        // OTP sign in - for now, just use the same auth endpoint
        return get().signIn(email);
      },

      signInWithPassword: async (email, password) => {
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
          } else {
            return { error: { message: 'Sign in failed' } };
          }
        } catch (error) {
          console.error('Sign in with password error:', error);
          return { error };
        }
      },

      signOut: async () => {
        set({ user: null, session: null });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
