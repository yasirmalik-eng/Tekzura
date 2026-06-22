import { createClient } from '@supabase/supabase-js';

export interface LeadInsert {
  name: string;
  email: string;
  company: string | null;
  service: string;
  budget: string | null;
  timeline: string | null;
  message: string;
  source: string;
  user_agent: string | null;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

