import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nupdkgpfgzbhllfsqjgz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_z3T6HpNAFARnOYxz_juiFw_upv0FNWo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
