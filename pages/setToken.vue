<script setup lang="ts">
    const password = ref('')
    const authToken = useCookie('auth')

    const { $toast } = useNuxtApp()

    if (authToken.value) {
        $toast.info('Ya tienes una contraseña establecida')
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
            $toast.error('Contraseña incorrecta')
            return
        }

        authToken.value = password.value
        $toast.success('Contraseña establecida correctamente')
        await navigateTo('/')
    }

</script>

<template>
    <div class="flex flex-col mx-auto h-64 w-96 m-8 bg-secondary rounded-lg justify-center align-middle">
        <h3 class="text-4xl font-bold pt-4 text-center">Contraseña <span>😐</span></h3>

        <form class="flex py-4" @submit="onSubmit">
            <input type="password" class="text-black w-3/4 m-4 p-2 rounded-lg" v-model="password" placeholder="Contraseña" />
            <button class="w-1/4 m-4 p-2 bg-primary/80 rounded-lg" @click="">Establecer</button>
        </form>
    </div>
</template>