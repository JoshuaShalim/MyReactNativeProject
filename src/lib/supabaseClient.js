import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lewzafwmaoeqmsqeqozy.supabase.co'; // from API settings
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxld3phZndtYW9lcW1zcWVxb3p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NTMzNDEsImV4cCI6MjA3MDIyOTM0MX0.Jig-CoYo84OalQZI9jneTkzUUirBD4oFpaMB7WAtaS0'; // from API settings

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
