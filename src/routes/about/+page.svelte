<script>
    let company = {
        name: "PT. Teknologi Inovatif",
        description: "PT. Teknologi Inovatif adalah perusahaan yang bergerak di bidang pengembangan teknologi berbasis web dan mobile. Kami berkomitmen untuk memberikan solusi digital yang inovatif dan berkualitas tinggi.",
        vision: "Menjadi perusahaan teknologi terdepan yang memberikan dampak positif bagi masyarakat.",
        mission: [
            "Mengembangkan solusi digital yang inovatif dan berkualitas.",
            "Memberikan pelayanan terbaik kepada pelanggan.",
            "Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan.",
            "Berinovasi dalam teknologi untuk masa depan yang lebih baik."
        ],
        team: [
            { name: "Rizky Ramadhan", role: "CEO", image: "https://randomuser.me/api/portraits/men/1.jpg" },
            { name: "Siti Aisyah", role: "CTO", image: "https://randomuser.me/api/portraits/women/2.jpg" },
            { name: "Budi Santoso", role: "COO", image: "https://randomuser.me/api/portraits/men/3.jpg" },
            { name: "Dewi Lestari", role: "CMO", image: "https://randomuser.me/api/portraits/women/4.jpg" }
        ]
    };
</script>

<div class="max-w-4xl mx-auto py-10 px-6">
    <h1 class="text-4xl font-bold text-center text-blue-600 mb-6">Tentang Kami</h1>

    <section class="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">🏢 {company.name}</h2>
        <p class="text-gray-600">{company.description}</p>
    </section>

    <section class="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">🌟 Visi</h2>
        <p class="text-gray-600 italic">"{company.vision}"</p>
    </section>

    <section class="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">🎯 Misi</h2>
        <ul class="list-disc list-inside text-gray-600">
            {#each company.mission as item}
                <li>{item}</li>
            {/each}
        </ul>
    </section>

    <section class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">👨‍💼 Tim Kami</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {#each company.team as member}
                <div class="text-center">
                    <img src={member.image} alt={member.name} class="w-24 h-24 mx-auto rounded-full shadow-md" />
                    <h3 class="text-lg font-semibold mt-3">{member.name}</h3>
                    <p class="text-gray-500">{member.role}</p>
                </div>
            {/each}
        </div>
    </section>
</div>
