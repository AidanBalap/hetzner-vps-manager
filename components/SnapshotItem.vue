<script setup lang="ts">
    const props = defineProps(['snapshot'])
    const timestamp = new Date(props.snapshot.created)
    const statusColor = ref('')
    
    switch (props.snapshot.status) {
        case 'running':
            statusColor.value = 'bg-green-500'
            break
        case 'off':
            statusColor.value = 'bg-red-500'
            break
        case 'deploying':
            statusColor.value = 'bg-yellow-500'
            break
        default:
            statusColor.value = 'bg-gray-500'
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
            <button class="bg-[#202020] px-1 rounded-lg hover:scale-110">Cargar</button>
        </div>
    </div>
</template>