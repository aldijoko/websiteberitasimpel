<script>
    import { supabase } from "$lib/supabase.js";
    import { goto } from "$app/navigation";

    let title = "";
    let description = "";
    let startDate = "";
    let endDate = "";
    let errorMessage = "";

    async function addEvent() {
        errorMessage = "";

        if (!title || !description || !startDate || !endDate) {
            errorMessage = "Semua field harus diisi!";
            return;
        }

        const { error } = await supabase.from("events").insert([
            {
                title,
                description,
                start_date: startDate,
                end_date: endDate,
                created_at: new Date().toISOString()
            }
        ]);

        if (!error) {
            alert("Event berhasil ditambahkan!");
            goto("/admin");
        } else {
            errorMessage = "Gagal menambahkan event: " + error.message;
        }
    }
</script>

<div class="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
    <h1 class="text-3xl font-bold mb-6 text-center">Tambah Event</h1>

    <div class="space-y-4">
        <input type="text" bind:value={title} placeholder="Judul Event" class="w-full p-2 border rounded" />
        <textarea bind:value={description} placeholder="Deskripsi Event" class="w-full p-2 border rounded"></textarea>
        <input type="date" bind:value={startDate} class="w-full p-2 border rounded" />
        <input type="date" bind:value={endDate} class="w-full p-2 border rounded" />

        {#if errorMessage}
            <p class="text-red-500">{errorMessage}</p>
        {/if}

        <button on:click={addEvent} class="bg-blue-500 text-white px-4 py-2 rounded w-full">Tambahkan Event</button>
    </div>
</div>
