<script setup lang="ts">
    const authToken = useCookie('auth')
    const props = defineProps(['snapshot'])
    const timestamp = new Date(props.snapshot.created)

    const { $toast } = useNuxtApp()
    const statusColor = ref('')
    
    switch (props.snapshot.status) {
        case 'available':
            statusColor.value = 'bg-green-500'
            break
        case 'creating':
            statusColor.value = 'bg-yellow-500'
            break
        default:
            statusColor.value = 'bg-gray-500'
    }

    const deploySnapshot = async () => {
        const response = await fetch('/api/snapshots/' + props.snapshot.id + '/deploy?name='+ props.snapshot.description, {
            method: 'POST',
            headers: { 'Authorization': `${authToken.value}` }
        })

        if (response.status != 200) {
            $toast.error('Error al lanzar el servidor')
            return
        }

        const data = await response.json()
        const serverId = data.server.id

        $toast.success('Servidor lanzado correctamente con ID: ' + serverId)
        await navigateTo('/servers/' + serverId)
    }
</script>

<template>
    <div class="flex bg-secondary rounded-xl py-4">
        <p class="flex w-[8%] justify-center align-middle">
            <span class="block size-6 rounded-full" :class="statusColor"></span>
        </p>
        <p class="text-center w-[30%]">{{ props.snapshot.description }}</p>
        <p class="text-center w-[16%]">{{ Math.round((snapshot.image_size * 0.011) * 100) / 100 }}€/mes</p>
        <p class="text-center w-[16%]">{{ Math.round(snapshot.image_size * 100) / 100 }}GB de {{ snapshot.disk_size }}GB</p>
        <p class="text-center w-[20%]">{{ dateToTimeAgo(timestamp) }}</p>
        <div class="flex justify-center text-center w-[10%]">
            <button @click="deploySnapshot()" class="bg-[#202020] px-1 rounded-lg hover:scale-110">Cargar</button>
        </div>
    </div>
</template>