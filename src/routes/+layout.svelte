<script>
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase.js';
    import { goto } from '$app/navigation';

	let { children } = $props();

	let user = null;
    let role = 'user';

    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            user = session.user;
            role = await getUserRole();
        }
    });

    async function logout() {
        await supabase.auth.signOut();
        goto('/login');
    }

</script>

<nav class="bg-blue-600 text-white p-4 flex justify-between items-center">
    <div class="text-xl font-bold">
        <a href="/">NewsApp</a>
    </div>
    <div class="space-x-4">
        <a href="/" class="hover:underline">Home</a>
		<a href="/about" class="hover:underline">About Us</a>
        <a href="/news" class="hover:underline">Berita</a>
		<a href="/event" class="hover:underline">Kegiatan</a>
        <!-- {#if user && role === 'admin'} -->
            <a href="/admin" class="hover:underline">Admin</a>
        <!-- {/if} -->
        {#if user}
            <!-- <button on:click={logout} class="bg-red-500 px-4 py-2 rounded">Logout</button> -->
        {/if}
    </div>
</nav>

<main class="container mx-auto mt-6 px-4">
    <ParaglideJS {i18n}>
		{@render children()}
	</ParaglideJS>
</main>

