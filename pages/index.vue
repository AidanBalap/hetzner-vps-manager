<script setup>
    const authToken = useCookie('auth')
    
    if (!authToken.value) {
        await navigateTo('/setToken')
    }

    // Fetch servers
    const servers = ref([])
    const fetchServers = async () => {
        const response = await fetch('/api/server', {
            method: 'GET',
            headers: { 'Authorization': `${authToken.value}` }
        })

        if (response.status != 200) {
            alert('Error al obtener los servidores')
            return
        }

        servers.value = await response.json()
    }

    fetchServers()
</script>

<template>
    <div class="flex flex-col mx-auto  m-8 bg-slate-700 rounded-lg justify-center align-middle">
        <h3 class="text-4xl text-bold pt-4 text-center">Servidores <span>🚀</span></h3>

        <div class="flex flex-col py-4 gap-y-8">
            <a v-for="server in servers" :key="server.id" v-bind:href="'server/'+ server.id" class="flex flex-row justify-between p-4 bg-slate-500 rounded-lg m-4">
                <div class="flex align-middle">
                    <span class="flex justify-center px-4">{{ server.status == 'running' ? '🟢' : '🔴' }}</span>
                    <h4 class="text-xl text-bold">{{ server.name }} - <span class="text-sm">{{ server.ipv4 }}</span></h4>
                </div>
                <div class="flex gap-x-2">
                    <p class="text-md">{{ server.type }}</p>
                    <span>|</span>
                    <div class="flex gap-x-2">
                        <p class="text-md">{{ server.specs.cores }} nucleos</p>
                        <p class="text-md">{{ server.specs.memory }} GB RAM</p>
                    </div>
                    <span>|</span>
                    <p class="text-md">{{ Math.round(server.price.monthly * 100) / 100 }}€ /mes</p>
                    <span>|</span>
                    <p class="text-md">{{ server.created }}</p>
                </div>
            </a>
        </div>
    </div>
</template>