import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nupdkgpfgzbhllfsqjgz.supabase.co';
const supabaseAnonKey = 'sb_publishable_z3T6HpNAFARnOYxz_juiFw_upv0FNWo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
