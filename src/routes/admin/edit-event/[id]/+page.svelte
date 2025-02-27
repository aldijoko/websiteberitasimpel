<script>
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabase.js";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    let event = {
        title: "",
        description: "",
        start_date: "",
        end_date: ""
    };
    let id = $page.params.id;
    let errorMessage = "";

    function formatDate(dateString) {
        if (!dateString) return "";
        return new Date(dateString).toISOString().split("T")[0]; // Ambil format YYYY-MM-DD
    }

    onMount(async () => {
        let { data } = await supabase.from("events").select("*").eq("id", id).single();
        if (data) {
            event = { 
                ...data,
                start_date: formatDate(data.start_date),
                end_date: formatDate(data.end_date)
            };
        } else {
            errorMessage = "Event tidak ditemukan!";
        }
    });

    async function updateEvent() {
        errorMessage = "";

        if (!event.title || !event.description || !event.start_date || !event.end_date) {
            errorMessage = "Semua field harus diisi!";
            return;
        }

        const { error } = await supabase
            .from("events")
            .update({
                title: event.title,
                description: event.description,
                start_date: event.start_date, // Format sudah sesuai (YYYY-MM-DD)
                end_date: event.end_date
            })
            .eq("id", id);

        if (!error) {
            alert("Event berhasil diperbarui!");
            goto("/admin");
        } else {
            errorMessage = "Gagal memperbarui event: " + error.message;
        }
    }
</script>

<div class="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
    <h1 class="text-3xl font-bold mb-6 text-center">Edit Event</h1>

    <div class="space-y-4">
        <input type="text" bind:value={event.title} placeholder="Judul Event" class="w-full p-2 border rounded" />
        <textarea bind:value={event.description} placeholder="Deskripsi Event" class="w-full p-2 border rounded"></textarea>
        <input type="date" bind:value={event.start_date} class="w-full p-2 border rounded" />
        <input type="date" bind:value={event.end_date} class="w-full p-2 border rounded" />

        {#if errorMessage}
            <p class="text-red-500">{errorMessage}</p>
        {/if}

        <button on:click={updateEvent} class="bg-blue-500 text-white px-4 py-2 rounded w-full">Simpan Perubahan</button>
    </div>
</div>
