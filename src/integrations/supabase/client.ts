// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dlvyuogjkvfrxljfrfak.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsdnl1b2dqa3ZmcnhsamZyZmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMDEwNDgsImV4cCI6MjA1NzY3NzA0OH0.cBZW7ljxuEz495266mcLOiivHeK9RvRf7XhlMoDLDVA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);