import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  userType: 'user' | 'business' | 'admin';
}

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserData(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserData(session.user.id);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setUser({
        id: data.id,
        email: data.email,
        displayName: data.display_name,
        photoURL: data.avatar_url || `https://ui-avatars.com/api/?name=${data.display_name}&background=000&color=fff`,
        userType: data.user_type
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    const response = await fetch(`${supabaseUrl}/functions/v1/auth-handler`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({
        action: 'signup',
        email,
        password,
        userData: {
          displayName: email.split('@')[0]
        }
      })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error);
    
    return result;
  };

  const signIn = async (email: string, password: string) => {
    const response = await fetch(`${supabaseUrl}/functions/v1/auth-handler`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({
        action: 'signin',
        email,
        password
      })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error);
    
    return result;
  };

  const signInWithGoogle = async () => {
    const response = await fetch(`${supabaseUrl}/functions/v1/auth-handler`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Origin': window.location.origin
      },
      body: JSON.stringify({
        action: 'google-signin'
      })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error);
    
    if (result.url) {
      window.location.href = result.url;
    }
  };

  const signOut = async () => {
    await fetch(`${supabaseUrl}/functions/v1/auth-handler`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({
        action: 'signout'
      })
    });
    
    setUser(null);
  };

  const trackAnalytics = async (actionType: string, data: any = {}) => {
    try {
      await fetch(`${supabaseUrl}/functions/v1/analytics-tracker`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          userId: user?.id,
          actionType,
          sessionId,
          ...data
        })
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    trackAnalytics
  };
}