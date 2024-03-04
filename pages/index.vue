<script setup>
    const authToken = useCookie('auth')
    
    if (!authToken.value) {
        await navigateTo('/setToken')
    }

    // Fetch servers
    const servers = ref([])
    const snapshots = ref([])

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

    const fetchSnapshots = async () => {
        const response = await fetch('/api/snapshots', {
            method: 'GET',
            headers: { 'Authorization': `${authToken.value}` }
        })

        if (response.status != 200) {
            alert('Error al obtener los snapshots')
            return
        }

        snapshots.value = await response.json()
    }

    const launchServer = async (id) => {
        alert ("Lanzando el servidor, esto va a tardar un cojón y medio")
        const response = await fetch('/api/snapshots/' + id + '/deploy', {
            method: 'POST',
            headers: { 'Authorization': `${authToken.value}` },
        })

        if (response.status != 200) {
            alert('Error al lanzar el servidor')
            return
        }

        window.location.reload()
    }

    fetchServers()
    fetchSnapshots()
</script>

<template>
    <div class="flex flex-col mx-auto  m-8 bg-slate-700 rounded-lg justify-center align-middle">
        <h3 class="text-4xl text-bold pt-4 text-center">Servidores <span>🚀</span></h3>

        <div class="flex flex-col py-4 gap-y-4">
            <a v-for="server in servers" :key="server.id" v-bind:href="'server/'+ server.id" class="flex flex-row justify-between p-4 bg-slate-500 rounded-lg mx-4">
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

    <div class="flex flex-col mx-auto  m-8 bg-slate-700 rounded-lg justify-center align-middle">
        <h3 class="text-4xl text-bold pt-4 text-center">Servidores no activos <span>🧊</span></h3>

        <div class="flex flex-col py-4 gap-y-4">
            <a v-for="snapshot in snapshots" :key="snapshot.id" class="flex flex-row justify-between p-4 bg-slate-500 rounded-lg mx-4">
                <div class="flex align-middle">
                    <span class="flex justify-center px-4">{{ snapshot.status == 'available' ? '🟢' : '🔴' }}</span>
                    <h4 class="text-xl text-bold">{{ snapshot.description }}</h4>
                </div>

                <button @click="launchServer(snapshot.id)" class="bg-slate-600 rounded-lg px-2">Cargar</button>

                <div class="flex gap-x-2"> 
                    <p>{{ Math.round((snapshot.image_size * 0.011) * 100) / 100 }}€/mes</p>
                    <span>|</span>
                    <p class="text-md">{{ Math.round(snapshot.image_size * 100) / 100 }}GB de {{ snapshot.disk_size }}GB</p>
                    <span>|</span>
                    <p class="text-md">{{ snapshot.created }}</p>
                </div>
            </a>
        </div>
    </div>
</template>