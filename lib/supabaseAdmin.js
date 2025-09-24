// lib/supabaseAdmin.js
import { createClient } from '@supabase/supabase-js';

// This file MUST only be used inside server-side routes (API routes) — never import it in client code.
const SUPABASE_SERVICE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin = createClient(SUPABASE_SERVICE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});
