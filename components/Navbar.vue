<script setup>
    const cfg = useRuntimeConfig();
    const { status, signIn, signOut } = useAuth();
    const isSignedIn = computed(() => status.value === 'authenticated');
</script>

<template>
    <header class="flex justify-between px-2 py-4 pt-8 border-b-2">
        <h2>
            <router-link to="/" class="text-4xl font-bold">{{ cfg.public.appName }}</router-link>
        </h2>

        <div class="flex gap-x-4">
            <router-link to="/" class="bg-[#383838] px-4 py-2 rounded-xl hover:scale-105">Inicio</router-link>
            <router-link to="/servers" class="bg-[#383838] px-4 py-2 rounded-xl hover:scale-105">Servidores</router-link>

            <button v-if="!isSignedIn" @click="signIn('discord')" class="bg-[#383838] px-4 py-2 rounded-xl hover:scale-105">Iniciar sesión</button>
            <button v-else @click="signOut" class="bg-[#383838] px-4 py-2 rounded-xl hover:scale-105">Cerrar sesión</button>
        </div>
    </header>
</template>