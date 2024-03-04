<script setup>
    const route = useRoute()
    const serverId = route.params.id

    const authToken = useCookie('auth')

    if (!authToken.value) {
        await navigateTo('/setToken')
    }

    const server = ref({})
    const actions = ref({})
    const fetchServer = async () => {
        const response = await fetch('/api/server/' + serverId, {
            method: 'GET',
            headers: { 'Authorization': `${authToken.value}` }
        })

        if (response.status != 200) {
            alert('Error al obtener el servidor')
            return
        }

        server.value = await response.json()
    }

    const fetchLastActions = async () => {
        const response = await fetch('/api/server/' + serverId + '/actions', {
            method: 'GET',
            headers: { 'Authorization': `${authToken.value}` }
        })

        if (response.status != 200) {
            alert('Error al obtener las acciones')
            return
        }

        actions.value = await response.json()
    }

    const powerOn = async () => {
        const response = await fetch('/api/server/' + serverId + '/start', {
            method: 'POST',
            headers: { 'Authorization': `${authToken.value}` }
        })

        if (response.status != 200) {
            alert(response.statusText)
            return
        } else {
            alert('Server is on')
            window.location.reload()
        }
    }

    const powerOff = async () => {
        alert('Apagando servidor')
        
        const response = await fetch('/api/server/' + serverId + '/stop', {
            method: 'POST',
            headers: { 'Authorization': `${authToken.value}` }
        })

        if (response.status != 200) {
            alert(response.statusText)
            return
        } else {
            alert('Server is off')
            window.location.reload()
        }
    }

    const escalateServer = async () => {
        alert  ('Escalando servidor')
        const response = await fetch('/api/server/' + serverId + '/scale', {
            method: 'POST',
            headers: { 'Authorization': `${authToken.value}` }
        })

        if (response.status != 200) {
            alert(response.statusText)
            return
        } else {
            alert('Server is escalated')
            window.location.reload()
        }

        fetchServer()
    }

    const toSnapshot = async () => {
        alert('Creando snapshot')
        const response = await fetch('/api/server/'+ serverId +'/saveAndDelete?name='+ server.name, {
            method: 'GET',
            headers: { 'Authorization': `${authToken.value}`}
        })

        if (response.status != 200) {
            alert(response.statusText)
            return
        } else {
            alert("Server eliminado :)")
            // Redirect /
            window.location.href = '/'
        }
    }

    fetchServer()
    fetchLastActions()
</script>

<template>
    <div class="flex flex-col mx-auto m-8 rounded-lg justify-center align-middle">
        <h3 class="text-4xl text-white font-bold pt-4 text-center">Servidor {{ server.name }} <span>🚀</span></h3>

        <div v-if="server.status" class="flex flex-col pt-4">
            <div class="flex flex-col gap-y-4 text-white mx-10 border-b-2 pb-4">
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

                <server-item :server="server" />
            </div>
        </div>

        <div v-if="server.status" class="grid grid-cols-3 grid-rows-1 m-10 gap-x-8">
            <div class="col-span-1 pr-6 border-r-2">
                <h3 class="text-4xl text-white font-bold">⚡ Acciones</h3>

                <div class="flex flex-col py-4 gap-y-4">
                    <button @click="powerOn()" class="bg-slate-600 rounded-lg p-2">Encender</button>
                    <button @click="powerOff()" class="bg-slate-600 rounded-lg p-2">Apagar</button>
                    <button @click="escalateServer()" class="bg-slate-600 rounded-lg p-2">Escalar</button>
                    <button @click="toSnapshot()" class="bg-slate-600 rounded-lg p-2">🧊</button>
                </div>
            </div>

            <div class="col-span-2">
                <h3 class="text-4xl text-white font-bold pb-4">🧾 Ultimas acciones</h3>

                <table class="text-white">
                    <thead>
                        <tr>
                            <th class="w-[25%]">Comando</th>
                            <th class="w-[15%]">Estado</th>
                            <th class="w-[10%]">Progreso</th>
                            <th class="w-[25%]">Inicio</th>
                            <th class="w-[25%]">Fin</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="action in actions" :key="action.id">
                            <td class="text-center text-white/70">{{ action.command }}</td>
                            <td class="text-center text-white/70">{{ action.status }}</td>
                            <td class="text-center text-white/70">{{ action.progress }}</td>
                            <td class="text-center text-white/70">{{ new Date(action.started).toLocaleString('es') }}</td>
                            <td class="text-center text-white/70" v-if="action.finished">{{ dateToTimeAgo(new Date(action.finished)) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    </div>
</template>