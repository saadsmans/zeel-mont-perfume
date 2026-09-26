import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

// Check Vite environment variables first, then fallback to user-saved localStorage credentials
const getInitialUrl = (): string => {
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('zellmont_supabase_url');
    if (local) return local;
  }
  return import.meta.env.VITE_SUPABASE_URL || '';
};

const getInitialKey = (): string => {
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('zellmont_supabase_anon_key');
    if (local) return local;
  }
  return import.meta.env.VITE_SUPABASE_ANON_KEY || '';
};

let currentUrl = getInitialUrl();
let currentKey = getInitialKey();

// Dummy valid placeholder so createClient doesn't throw if variables are empty
const FALLBACK_URL = 'https://placeholder.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

export let supabase: SupabaseClient<any> = createClient(
  currentUrl && currentUrl.startsWith('http') ? currentUrl : FALLBACK_URL,
  currentKey || FALLBACK_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    currentUrl &&
    currentUrl.startsWith('https://') &&
    currentKey &&
    currentUrl !== FALLBACK_URL
  );
};

export const getSupabaseConfig = () => {
  return {
    url: currentUrl,
    key: currentKey,
    isConfigured: isSupabaseConfigured(),
  };
};

export const updateSupabaseConfig = (url: string, key: string) => {
  currentUrl = url.trim();
  currentKey = key.trim();

  if (typeof window !== 'undefined') {
    if (currentUrl) {
      localStorage.setItem('zellmont_supabase_url', currentUrl);
    } else {
      localStorage.removeItem('zellmont_supabase_url');
    }

    if (currentKey) {
      localStorage.setItem('zellmont_supabase_anon_key', currentKey);
    } else {
      localStorage.removeItem('zellmont_supabase_anon_key');
    }
  }

  // Re-instantiate client
  supabase = createClient(
    currentUrl && currentUrl.startsWith('http') ? currentUrl : FALLBACK_URL,
    currentKey || FALLBACK_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    }
  );

  return isSupabaseConfigured();
};
