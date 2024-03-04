<script setup lang="ts">
    const password = ref('')
    const authToken = useCookie('auth')

    if (authToken.value) {
        await navigateTo('/')
    }

    async function onSubmit (event: Event) {
        event.preventDefault()

        const validResponse = await fetch('/api/auth/isTokenValid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: password.value })
        })

        if (validResponse.status != 200) {
            alert('Contraseña incorrecta')
            return
        }

        authToken.value = password.value
        await navigateTo('/')
    }

</script>

<template>
    <div class="flex flex-col mx-auto h-64 w-96 m-8 bg-slate-700 rounded-lg justify-center align-middle">
        <h3 class="text-4xl text-bold pt-4 text-center">Contraseña <span>😐</span></h3>

        <form class="flex py-4" @submit="onSubmit">
            <input type="password" class="w-3/4 m-4 p-2 rounded-lg" v-model="password" placeholder="Contraseña" />
            <button class="w-1/4 m-4 p-2 bg-slate-500 rounded-lg" @click="">Establecer</button>
        </form>
    </div>
</template>