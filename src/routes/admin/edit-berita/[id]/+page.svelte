<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase.js';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    let id = $page.params.id;
    let title = '';
    let content = '';
    let image = '';
    // let imageFile = null;

    onMount(async () => {
        let { data } = await supabase.from('news').select('*').eq('id', id).single();
        if (data) {
            title = data.title;
            content = data.content;
            // image = data.image;
        }
    });

    async function updateNews() {
        let imagePath = image;

        // if (imageFile) {
        //     try {
        //         imagePath = await uploadImage(imageFile);
        //     } catch (error) {
        //         alert('Gagal upload gambar: ' + error.message);
        //         return;
        //     }
        // }

        const { error } = await supabase.from('news').update({ title, content }).eq('id', id);
        if (!error) {
            alert('Berita berhasil diperbarui!');
            goto('/admin');
        }
    }
</script>

<h1 class="text-3xl font-bold mb-6">Edit Berita</h1>
<div class="max-w-lg bg-white p-6 shadow-md rounded-md">
    <input class="w-full p-2 border rounded mb-3" type="text" bind:value={title} placeholder="Judul Berita" />
    <textarea class="w-full p-2 border rounded mb-3" bind:value={content} placeholder="Isi Berita"></textarea>
    <!-- <img src={getImageUrl(image)} alt="Gambar Berita" width="200" />
    <input type="file" on:change={(e) => imageFile = e.target.files[0]} /> -->
    <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={updateNews}>Update Berita</button>
</div>

