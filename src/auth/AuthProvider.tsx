import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

export type AuthUser = {
  id: string;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  userType?: 'user' | 'business' | 'admin';
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  signInEmailPassword: (email: string, password: string) => Promise<void>;
  signUpEmailPassword: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      const sessionUser = data.session?.user ?? null;
      if (sessionUser) {
        setUser({
          id: sessionUser.id,
          email: sessionUser.email ?? null,
          displayName: sessionUser.user_metadata?.full_name ?? sessionUser.email ?? null,
          avatarUrl: sessionUser.user_metadata?.avatar_url ?? null,
          userType: sessionUser.user_metadata?.user_type,
        });
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user ?? null;
      if (sessionUser) {
        setUser({
          id: sessionUser.id,
          email: sessionUser.email ?? null,
          displayName: sessionUser.user_metadata?.full_name ?? sessionUser.email ?? null,
          avatarUrl: sessionUser.user_metadata?.avatar_url ?? null,
          userType: sessionUser.user_metadata?.user_type,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInEmailPassword = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signUpEmailPassword = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    signInEmailPassword,
    signUpEmailPassword,
    signOut,
  }), [user, loading, signInEmailPassword, signUpEmailPassword, signOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}

