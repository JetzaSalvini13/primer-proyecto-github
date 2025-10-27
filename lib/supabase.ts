import { createClient } from '@supabase/supabase-js';

// Obtener las credenciales desde variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Interfaces para TypeScript
export interface TurnoDatabase {
  id?: number;
  name: string;
  date: string;
  time: string;
  service: string;
  created_at?: string;
  status?: string;
}

export interface TurnoResponse {
  id: number;
  name: string;
  date: string;
  time: string;
  service: string;
  created_at?: string;
  status?: string;
}

