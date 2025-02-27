<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase.js';

    let news = [];
    let events = [];

    onMount(async () => {
        let { data: newsData } = await supabase.from('news').select('*');
        let { data: eventsData } = await supabase.from('events').select('*');
        news = newsData;
        events = eventsData;
    });
</script>

<div class="max-w-4xl mx-auto py-8">
    <h1 class="text-4xl font-bold text-center mb-6 text-blue-600">Selamat Datang di Website Berita</h1>

    <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">📰 Berita Terbaru</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each news as item}
                <a href={`/news/${item.id}`} class="block bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition">
                    <h3 class="text-lg font-semibold text-gray-900">{item.title}</h3>
                </a>
            {/each}
        </div>
    </section>

    <section>
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">📅 Kegiatan Terbaru</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each events as event}
                <a href={`/event/${event.id}`} class="block bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition">
                    <h3 class="text-lg font-semibold text-gray-900">{event.title}</h3>
                </a>
            {/each}
        </div>
    </section>
</div>
