<script setup>
    const { $toast } = useNuxtApp()

    const route = useRoute()
    const serverId = route.params.id

    const authToken = useCookie('auth')

    if (!authToken.value) {
        $toast.alert('Debes establecer una contraseña para continuar')
        await navigateTo('/setToken')
    }

    const server = ref({})
    const actions = ref({})

    const fetchServer = async () => {
        const response = await fetch('/api/servers/' + serverId, {
            method: 'GET',
            headers: { 'Authorization': `${authToken.value}` }
        })

        if (response.status != 200) {
            $toast.error('Error al obtener el servidor')
            return
        }

        server.value = await response.json()
    }

    const fetchLastActions = async () => {
        const response = await fetch('/api/servers/' + serverId + '/actions', {
            method: 'GET',
            headers: { 'Authorization': `${authToken.value}` }
        })

        if (response.status != 200) {
            $toast.error('Error al obtener las acciones')
            return
        }

        actions.value = await response.json()
    }

    const refreshData = async () => {
        console.log("[*] Refreshing data")
        fetchServer()
        fetchLastActions()
    }

    const powerOn = async () => {
        $toast.info('Encendiendo servidor')

        const response = await fetch('/api/servers/' + serverId + '/start', {
            method: 'POST',
            headers: { 'Authorization': `${authToken.value}` }
        })

        if (response.status != 200) {
            $toast.error(response.statusText)
            return
        }

        $toast.success('Server is on')
        refreshData()
    }

    const powerOff = async () => {
        $toast.info('Apagando servidor')
        
        const response = await fetch('/api/servers/' + serverId + '/stop', {
            method: 'POST',
            headers: { 'Authorization': `${authToken.value}` }
        })

        if (response.status != 200) {
            $toast.error(response.statusText)
            return
        }

        $toast.success('Server is off')
        refreshData()
    }

    const escalateServer = async () => {
        if (server.value.status != 'off') {
            $toast.error('El servidor debe estar apagado para escalarlo')
            return
        }

        $toast.info ('Escalando servidor')

        const response = await fetch('/api/servers/' + serverId + '/scale', {
            method: 'POST',
            headers: { 'Authorization': `${authToken.value}` }
        })

        if (response.status != 200) {
            $toast.error(response.statusText)
            return
        } else {
            $toast.success('Server is escalated')
            refreshData()
        }

        fetchServer()
    }

    const toSnapshot = async () => {
        $toast.info('Creando snapshot')
        const response = await fetch('/api/servers/'+ serverId +'/saveAndDelete?name='+ server.value.name, {
            method: 'GET',
            headers: { 'Authorization': `${authToken.value}`}
        })

        if (response.status != 200) {
            $toast.error(response.statusText)
            return
        }
        
        $toast.success('Servidor congelado')
        await navigateTo('/')
    }

    const deleteSv = async () => {
        // Confirm dialog
        if (!confirm('¿Estás seguro de que quieres borrar el servidor?')) {
            return
        }

        $toast.info('Borrando servidor')

        const response = await fetch('/api/servers/' + serverId + '/delete', {
            headers: { 'Authorization': `${authToken.value}` }
        })

        if (response.status != 200) {
            $toast.error(response.statusText)
            return
        }

        $toast.success('Servidor eliminado')
        await navigateTo('/')
    }

    setTimeout(() => {
        refreshData()
    }, 1000 * 30)

    refreshData()

</script>

<template>
    <div class="flex flex-col mx-auto m-8 rounded-lg justify-center align-middle">
        <h3 class="text-4xl font-bold pt-4 text-center">Servidor
            <span v-if="server.name">{{ server.name }}</span>
            <span v-if="!server.name"> ... </span>
            <span>🚀</span>
        </h3>

        <div v-if="server.status" class="flex flex-col pt-4">
            <div class="flex flex-col gap-y-4 mx-10 border-b-2 pb-4">
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
                <h3 class="text-4xl font-bold">⚡ Acciones</h3>

                <div class="flex flex-col py-4 gap-y-4">
                    <button @click="powerOn()" class="bg-secondary/80 rounded-lg p-2 hover:scale-105 hover:underline">Encender</button>
                    <button @click="powerOff()" class="bg-secondary/80 rounded-lg p-2 hover:scale-105 hover:underline">Apagar</button>
                    <button @click="escalateServer()" class="bg-secondary/80 rounded-lg p-2 hover:scale-105 hover:underline">Escalar</button>
                    <button @click="toSnapshot()" class="bg-secondary/80 rounded-lg p-2 hover:scale-105 hover:underline">Congelar 🧊</button>
                    <button @click="deleteSv()" class="bg-red-400/80 rounded-lg p-2 hover:scale-105 hover:underline">Borrar 🚨</button>
                </div>
            </div>

            <div class="col-span-2">
                <h3 class="text-4xl font-bold pb-4">🧾 Ultimas acciones</h3>

                <div class="max-h-[400px] overflow-y-scroll">
                    <table>
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

        <div v-if="!server.status" class="flex justify-center align-middle py-40">
            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>