
import { createClient } from '@supabase/supabase-js';

// ------------------------------------------------------------------
// PASTE YOUR SUPABASE KEYS HERE
// ------------------------------------------------------------------
// NOTE: Ensure SUPABASE_URL is a valid URL (starts with https://) to avoid "Invalid URL" errors.
const SUPABASE_URL = 'https://xnjjfogggtqxxdwfnwbu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhuampmb2dnZ3RxeHhkd2Zud2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyMzQ2MDgsImV4cCI6MjA4NDgxMDYwOH0.6Gwffdeqw95_vUN_4vC6V5iWisFzu9zrpSbaZeQ8jIc';
// ------------------------------------------------------------------

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
