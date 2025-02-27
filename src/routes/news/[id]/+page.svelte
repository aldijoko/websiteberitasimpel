<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase.js';
    import { page } from '$app/stores';

    let newsItem = null;
    let id = $page.params.id;

    onMount(async () => {
        let { data } = await supabase.from('news').select('*').eq('id', id).single();
        newsItem = data;
    });

    function formatDate(dateString) {
        return new Date(dateString).toLocaleString();
    }
</script>

{#if newsItem}
    <div class="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-md">
        <h1 class="text-3xl font-bold">{newsItem.title}</h1>
        <p class="text-gray-500 text-sm">{formatDate(newsItem.created_at)}</p>
        <!-- <img src={getImageUrl(newsItem.image)} alt={newsItem.title} class="w-full h-60 object-cover rounded my-4" /> -->
        <p class="text-lg">{newsItem.content}</p>
    </div>
{/if}
