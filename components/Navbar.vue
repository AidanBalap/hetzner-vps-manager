<script setup>
    const isAuth = useCookie('auth')
</script>

<template>
    <header class="flex justify-between px-2 py-4 pt-8 border-b-2">
        <h2>
            <router-link to="/" class="text-4xl font-bold">Gambuso Servers</router-link>
        </h2>

        <div class="flex gap-x-4">
            <router-link to="/" class="bg-[#383838] px-4 py-2 rounded-xl hover:scale-105">Inicio</router-link>
            <router-link to="/servers" class="bg-[#383838] px-4 py-2 rounded-xl hover:scale-105">Servidores</router-link>
            <router-link to="/setToken" class="bg-[#383838] px-4 py-2 rounded-xl hover:scale-105" v-if="!isAuth">Establecer contraseña</router-link>
            <router-link to="/logout" class="bg-[#383838] px-4 py-2 rounded-xl hover:scale-105" v-else>Desconexión</router-link>
        </div>
    </header>
</template>