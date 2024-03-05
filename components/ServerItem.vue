<script setup lang="ts">
    const props = defineProps(['server'])
    const timestamp = new Date(props.server.created)
    
    const statusColor = ref('')
    switch (props.server.status) {
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

    const pathToServer = '/server/' + props.server.id
</script>

<template>
    <router-link :to="'/server/'+ props.server.id" class="flex bg-secondary hover:bg-[#454545] hover:scale-105 rounded-xl py-4">
        <p class="flex w-[8%] justify-center align-middle">
            <span class="block size-6 rounded-full" :class="statusColor"></span>
        </p>
        <p class="text-center w-[23%]">{{ props.server.name }}</p>
        <p class="text-center w-[19%]">{{ props.server.ipv4 }}</p>
        <p class="text-center w-[9%]">{{ props.server.type }}</p>
        <p class="text-center w-[9%]">{{ props.server.specs.cores }} cores</p>
        <p class="text-center w-[9%]">{{ props.server.specs.memory }}GB</p>
        <p class="text-center w-[9%]">{{ Math.round(props.server.price.monthly * 100) / 100 }}€</p>
        <p class="text-center w-[16%]">{{ dateToTimeAgo(timestamp) }}</p>
    </router-link>
</template>