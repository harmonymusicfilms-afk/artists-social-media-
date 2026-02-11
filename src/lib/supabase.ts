
import { createClient } from '@supabase/supabase-js';

// Default to env vars, fallback to provided hardcoded keys if safe, else null.
// Using 'any' cast for import.meta to avoid TS errors when vite types are missing
const env = (import.meta as any).env || {};
const SUPABASE_URL = env.VITE_SUPABASE_URL || 'https://xnjjfogggtqxxdwfnwbu.supabase.co';
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhuampmb2dnZ3RxeHhkd2Zud2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyMzQ2MDgsImV4cCI6MjA4NDgxMDYwOH0.6Gwffdeqw95_vUN_4vC6V5iWisFzu9zrpSbaZeQ8jIc';

const isUrlValid = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Export a safe client or a mock to prevent app crash
export const supabase = isUrlValid(SUPABASE_URL) && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : {
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        eq: () => ({ single: () => ({ data: null, error: null }) }),
        in: () => ({ data: [], error: null }),
        order: () => ({ data: [], error: null }),
      }),
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ data: null, error: { message: "Supabase not configured" } }),
        signUp: async () => ({ data: null, error: { message: "Supabase not configured" } }),
        signOut: async () => {},
      }
    } as any;
