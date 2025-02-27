<script>
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabase.js";

    let upcomingEvents = [];
    let ongoingEvents = [];

    function formatDate(dateString) {
        if (!dateString) return "-";
        const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    }

    onMount(async () => {
        let { data } = await supabase.from("events").select("*").order("start_date", { ascending: true });

        const now = new Date();
        upcomingEvents = data.filter(event => new Date(event.start_date) > now);
        ongoingEvents = data.filter(event => new Date(event.start_date) <= now && new Date(event.end_date) >= now);
    });
</script>

<div class="max-w-4xl mx-auto py-10 px-6">
    <h1 class="text-4xl font-bold text-center text-blue-600 mb-6">📅 Event</h1>

    <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">🔥 Event yang Sedang Berlangsung</h2>
        {#if ongoingEvents.length > 0}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {#each ongoingEvents as event}
                    <div class="bg-white shadow-md rounded-lg p-4 border-l-4 border-yellow-500">
                        <h3 class="text-lg font-semibold text-gray-900">{event.title}</h3>
                        <p class="text-gray-500">{formatDate(event.start_date)} - {formatDate(event.end_date)}</p>
                        <a href={`/events/${event.id}`} class="text-blue-500 hover:underline">Lihat Detail</a>
                    </div>
                {/each}
            </div>
        {:else}
            <p class="text-gray-500">Tidak ada event yang sedang berlangsung.</p>
        {/if}
    </section>

    <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">🎉 Event yang Akan Datang</h2>
        {#if upcomingEvents.length > 0}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {#each upcomingEvents as event}
                    <div class="bg-white shadow-md rounded-lg p-4">
                        <h3 class="text-lg font-semibold text-gray-900">{event.title}</h3>
                        <p class="text-gray-500">{formatDate(event.start_date)} - {formatDate(event.end_date)}</p>
                        <a href={`/events/${event.id}`} class="text-blue-500 hover:underline">Lihat Detail</a>
                    </div>
                {/each}
            </div>
        {:else}
            <p class="text-gray-500">Tidak ada event yang akan datang.</p>
        {/if}
    </section>
</div>
