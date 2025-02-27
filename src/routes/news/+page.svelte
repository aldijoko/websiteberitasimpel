<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase.js';

    let news = [];

    onMount(async () => {
        let { data } = await supabase.from('news').select('*').order('created_at', { ascending: false });
        news = data;
    });

    function formatDate(dateString) {
        return new Date(dateString).toLocaleString();
    }
</script>

<h1 class="text-3xl font-bold text-center mb-6">Berita Terbaru</h1>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each news as item}
        <div class="bg-white shadow-lg rounded-lg p-4">
            <!-- <img src={getImageUrl(item.image)} alt={item.title} class="w-full h-40 object-cover rounded" /> -->
            <h2 class="text-lg font-semibold mt-3">{item.title}</h2>
            <p class="text-gray-500 text-sm">{formatDate(item.created_at)}</p>
            <a href={`/news/${item.id}`} class="block mt-3 text-blue-500 hover:underline">Baca selengkapnya</a>
        </div>
    {/each}
</div>
