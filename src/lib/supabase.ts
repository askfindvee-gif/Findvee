import { createClient } from '@supabase/supabase-js';
import { getEnv } from '../config/env';

const { SUPABASE_URL, SUPABASE_ANON_KEY } = getEnv();

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

