<script>
    import { goto } from '$app/navigation';
    import { supabase } from '$lib/supabase.js';
    import { onMount } from 'svelte';

    let news = [];
    let events = [];

    function formatDate(dateString) {
        if (!dateString) return "-";
        const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    }

    async function deleteNews(id) {
        const { error } = await supabase.from('news').delete().eq('id', id);
        if (!error) {
            news = news.filter(n => n.id !== id);
            alert('Berita berhasil dihapus!');
        }
    }

    async function deleteEvent(id) {
        const { error } = await supabase.from('events').delete().eq('id', id);
        if (!error) {
            events = events.filter(e => e.id !== id);
            alert('Event berhasil dihapus!');
        }
    }

    onMount(async () => {
        let { data: newsData } = await supabase.from('news').select('*').order('created_at', { ascending: false });
        let { data: eventsData } = await supabase.from('events').select('*').order('start_date', { ascending: false });

        news = newsData;
        events = eventsData;
    });

    function addNews() {
        goto('/admin/tambah-berita');
    }

    function addEvent() {
        goto('/admin/tambah-event');
    }
</script>

<div class="max-w-4xl mx-auto py-10 px-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Dashboard Admin</h1>

    <!-- Kelola Berita -->
    <section class="mb-10">
        <h2 class="text-2xl font-semibold mb-4">📰 Kelola Berita</h2>
        <button on:click={addNews} class="bg-blue-500 text-white px-4 py-2 rounded mb-4">+ Tambah Berita</button>
        <div class="bg-white p-6 shadow-md rounded-lg">
            <ul>
                {#each news as item}
                    <li class="p-4 border-b flex justify-between items-center">
                        <div>
                            <h3 class="text-lg font-semibold">{item.title}</h3>
                            <p class="text-gray-500">{item.content}</p>
                        </div>
                        <div class="space-x-2">
                            <button on:click={() => goto(`/admin/edit-berita/${item.id}`)} class="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                            <button on:click={() => deleteNews(item.id)} class="bg-red-500 text-white px-3 py-1 rounded">Hapus</button>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </section>

    <!-- Kelola Events -->
    <section>
        <h2 class="text-2xl font-semibold mb-4">📅 Kelola Event</h2>
        <button on:click={addEvent} class="bg-green-500 text-white px-4 py-2 rounded mb-4">+ Tambah Event</button>
        <div class="bg-white p-6 shadow-md rounded-lg">
            <ul>
                {#each events as event}
                    <li class="p-4 border-b flex justify-between items-center">
                        <div>
                            <h3 class="text-lg font-semibold">{event.title}</h3>
                            <p class="text-gray-500">🗓 {formatDate(event.start_date)} - {formatDate(event.end_date)}</p>
                        </div>
                        <div class="space-x-2">
                            <button on:click={() => goto(`/admin/edit-event/${event.id}`)} class="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                            <button on:click={() => deleteEvent(event.id)} class="bg-red-500 text-white px-3 py-1 rounded">Hapus</button>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </section>
</div>
