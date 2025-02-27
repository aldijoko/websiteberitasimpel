import { createClient } from '@supabase/supabase-js';
import { createServerClient } from "@supabase/ssr";

export const supabase = createClient(
    'https://xrkiwbyuumakiobqridh.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhya2l3Ynl1dW1ha2lvYnFyaWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNzA0MzgsImV4cCI6MjA1NDk0NjQzOH0.Bkc3x85zmgJjpoAK2NRxn9r5BQZg8lA4likA3e1CFas'
);


export function createSupabaseClient(event) {
    return createServerClient(
        "https://xrkiwbyuumakiobqridh.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhya2l3Ynl1dW1ha2lvYnFyaWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNzA0MzgsImV4cCI6MjA1NDk0NjQzOH0.Bkc3x85zmgJjpoAK2NRxn9r5BQZg8lA4likA3e1CFas",
        {
            cookies: event.cookies
        }
    );
}
