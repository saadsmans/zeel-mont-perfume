import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured, getSupabaseConfig, updateSupabaseConfig } from '../lib/supabase';
import { supabaseService } from '../services/supabaseService';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  userOrders: any[];
  refreshOrders: () => Promise<void>;
  updateConfig: (url: string, key: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(isSupabaseConfigured());
  const [userOrders, setUserOrders] = useState<any[]>([]);

  useEffect(() => {
    let authListener: any = null;

    const initAuth = async () => {
      try {
        if (isSupabaseConfigured()) {
          const { data } = await supabase.auth.getSession();
          setSession(data.session);
          setUser(data.session?.user ?? null);

          if (data.session?.user) {
            const orders = await supabaseService.fetchUserOrders(data.session.user.id);
            setUserOrders(orders);
          }

          const { data: subData } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
            setSession(newSession);
            setUser(newSession?.user ?? null);
            if (newSession?.user) {
              const orders = await supabaseService.fetchUserOrders(newSession.user.id);
              setUserOrders(orders);
            } else {
              setUserOrders([]);
            }
          });
          authListener = subData;
        }
      } catch (err) {
        console.warn('Auth initialization notice:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [isConfigured]);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      // Local simulated patron session if Supabase is not yet configured
      const mockUser = {
        id: 'patron-' + Math.floor(1000 + Math.random() * 9000),
        email,
        user_metadata: { full_name: email.split('@')[0] },
      } as unknown as User;
      setUser(mockUser);
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };
      setUser(data.user);
      setSession(data.session);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!isSupabaseConfigured()) {
      const mockUser = {
        id: 'patron-' + Math.floor(1000 + Math.random() * 9000),
        email,
        user_metadata: { full_name: fullName },
      } as unknown as User;
      setUser(mockUser);
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      if (error) return { success: false, error: error.message };
      setUser(data.user);
      setSession(data.session);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn(err);
      }
    }
    setUser(null);
    setSession(null);
    setUserOrders([]);
  };

  const refreshOrders = async () => {
    if (user?.id) {
      const orders = await supabaseService.fetchUserOrders(user.id);
      setUserOrders(orders);
    }
  };

  const updateConfig = (url: string, key: string) => {
    const configured = updateSupabaseConfig(url, key);
    setIsConfigured(configured);
    return configured;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isConfigured,
        signIn,
        signUp,
        signOut,
        userOrders,
        refreshOrders,
        updateConfig,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
