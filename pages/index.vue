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
    <div class="flex flex-col gap-y-20 py-12">
        <div>
            <h3 class="text-3xl font-bold pb-4">🚀 Servidores activos :</h3>
        
            <div class="flex flex-col gap-y-4">
                <div class="flex justify-center align-middle border-b-2 py-2">
                    <p class="text-center w-[8%]">Estado</p>
                    <p class="text-center w-[23%]">Nombre</p>
                    <p class="text-center w-[19%]">IP</p>
                    <p class="text-center w-[9%]">Type</p>
                    <p class="text-center w-[9%]">Cores</p>
                    <p class="text-center w-[9%]">RAM</p>
                    <p class="text-center w-[9%]">€/mes</p>
                    <p class="text-center w-[16%]">Creación</p>
                </div>

                <server-item v-for="server in servers" :key="server.id" :server="server" />
            </div>
        </div>

        <div>
            <h3 class="text-3xl font-bold pb-4">🧊 Servidores en frio :</h3>
        
            <div class="flex flex-col gap-y-4">
                <div class="flex justify-center align-middle border-b-2 py-2">
                    <p class="text-center w-[8%]">Estado</p>
                    <p class="text-center w-[30%]">Nombre</p>
                    <p class="text-center w-[16%]">Precio</p>
                    <p class="text-center w-[16%]">Capacidad</p>
                    <p class="text-center w-[20%]">Creación</p>
                    <p class="text-center w-[10%]">Acción</p>
                </div>

                <snapshot-item v-for="snapshot in snapshots" :key="snapshot.id" :snapshot="snapshot" />
            </div>
        </div>
    </div>
</template>