<script>
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabase.js";
    import { page } from "$app/stores";

    let event = null;
    let id = $page.params.id;

    onMount(async () => {
        let { data } = await supabase.from("events").select("*").eq("id", id).single();
        event = data;
    });

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }
</script>

{#if event}
    <div class="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-md">
        <h1 class="text-3xl font-bold">{event.title}</h1>
        <p class="text-gray-500 text-sm">{formatDate(event.start_date)} - {formatDate(event.end_date)}</p>
        <p class="mt-4 text-lg">{event.description}</p>
    </div>
{/if}
