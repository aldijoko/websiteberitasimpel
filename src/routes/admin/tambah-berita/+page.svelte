<script>
    import { supabase } from '$lib/supabase.js';

    let title = '';
    let content = '';

    async function addNews() {
        const { error } = await supabase.from('news').insert([{ title, content }]);
        if (!error) {
            alert('Berita berhasil ditambahkan!');
            title = '';
            content = '';
        }
    }
</script>

<h1 class="text-3xl font-bold mb-6">Tambah Berita</h1>
<div class="max-w-lg bg-white p-6 shadow-md rounded-md">
    <input class="w-full p-2 border rounded mb-3" type="text" bind:value={title} placeholder="Judul Berita" />
    <textarea class="w-full p-2 border rounded mb-3" bind:value={content} placeholder="Isi Berita"></textarea>
    <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={addNews}>Tambahkan Berita</button>
</div>

