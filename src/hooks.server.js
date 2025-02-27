import { i18n } from '$lib/i18n';
import { createSupabaseClient } from "$lib/supabase.js";

const handleParaglide = i18n.handle();
export const handleParag = handleParaglide;

export async function handle({ event, resolve }) {
    console.log(event.locals, 'tess')
    event.locals.supabase = createSupabaseClient(event);
    event.locals.getSession = async () => {
        const { data: { session } } = await event.locals.supabase.auth.getSession();
        return session;
    };

    return resolve(event);
}