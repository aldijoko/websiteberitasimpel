import { redirect } from "@sveltejs/kit";

export const actions = {
    login: async ({ request, locals }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");

        const { error } = await locals.supabase.auth.signInWithPassword({ email, password });

        if (error) {
            return { error: error.message };
        }

        throw redirect(303, "/admin");
    }
};
