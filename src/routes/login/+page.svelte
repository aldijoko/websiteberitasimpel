<script>
	import { enhance } from "$app/forms";
    import { invalidate } from "$app/navigation";
    import { page } from "$app/stores";

    let email = "";
    let password = "";
    let errorMessage = "";

    async function login(event) {
        const formData = new FormData(event.target);
        const res = await fetch("/login", {
            method: "POST",
            body: formData
        });

        const result = await res.json();
        console.log(result);
        if (result.error) {
            errorMessage = result.error;
        } else {
            await invalidate("session");
        }
    }
</script>

<h1 class="text-3xl font-bold">Login</h1>

<form method="POST" use:enhance={login} class="flex flex-col gap-4">
    <input type="email" name="email" bind:value={email} placeholder="Email" class="p-2 border rounded" required />
    <input type="password" name="password" bind:value={password} placeholder="Password" class="p-2 border rounded" required />
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
</form>

{#if errorMessage}
    <p class="text-red-500">{errorMessage}</p>
{/if}
