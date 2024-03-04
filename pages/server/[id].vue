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

    fetchServer()
    fetchLastActions()
</script>

<template>
    <div class="flex flex-col mx-auto  m-8 bg-slate-700 rounded-lg justify-center align-middle">
        <h3 class="text-4xl text-bold pt-4 text-center">Servidor <span>🚀</span></h3>

        <div v-if="server.status" class="flex flex-col pt-4">
            <div class="flex flex-row justify-between p-4 bg-slate-500 rounded-lg m-4">
                <div  class="flex flex-col w-full"> 
                    <div class="flex justify-center align-middle">
                        <span class="flex justify-center px-4">{{ server.status == 'running' ? '🟢' : '🔴' }}</span>
                        <h4 class="text-xl text-bold">{{ server.name }} - <span class="text-sm">{{ server.ipv4 }}</span></h4>
                    </div>
                    <div class="flex gap-x-2 justify-center">
                        <p class="text-md">{{ server.type }}</p>
                        <span>|</span>
                        {{  }}
                        <div class="flex gap-x-2">
                            <p class="text-md">{{ server.specs.cores }} nucleos</p>
                            <p class="text-md">{{ server.specs.memory }} GB RAM</p>
                        </div>
                        <span>|</span>
                        <p class="text-md">{{ Math.round(server.price.monthly * 100) / 100 }}€ /mes</p>
                        <span>|</span>
                        <p class="text-md">{{ server.created }}</p>
                    </div>
                </div>
            </div>

            <div class="flex flex-row justify-between p-4 bg-slate-500 rounded-lg m-4">
                <div class="flex flex-col w-full justify-center">
                    <h4 class="text-2xl text-bold text-center pb-2">Acciones</h4>
                    <div class="flex gap-x-2 justify-center">
                        <button @click="powerOn()" class="bg-slate-600 rounded-lg p-2">Encender</button>
                        <button @click="powerOff()" class="bg-slate-600 rounded-lg p-2">Apagar</button>
                        <button @click="escalateServer()" class="bg-slate-600 rounded-lg p-2">Escalar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col justify-between p-4 bg-slate-500 rounded-lg m-4 gap-y-2">
            <h2 class="text-2xl font-bold text-center pb-2">Últimas acciones :</h2>
            <p>Acción | Estado | Porcentaje | Fecha inicio | Fecha fin</p>
            <div v-for="action in actions" :key="action.id" class="flex gap-x-2 justify-between border-b-2 border-black">
                <div>{{ action.command }}</div>
                <div>{{ action.status }}</div>
                <div>{{ action.progress }}</div>
                <div>{{ action.started }}</div>

                <div v-if="action.finished">{{  action.finished }}</div>
            </div>
        </div>
    </div>
</template>