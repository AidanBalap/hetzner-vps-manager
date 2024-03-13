<script setup lang="ts">
    const props = defineProps(['server'])
    const timestamp = new Date(props.server.created)

    const statusColors = {
        'running': 'bg-green-500',
        'off': 'bg-red-500',
        'initializing': 'bg-blue-500',
        'migrating': 'bg-yellow-500',
        'default': 'bg-gray-500'
    }
    
    const statusColor = ref('')
    statusColor.value = statusColors[props.server.status as keyof typeof statusColors] || statusColors.default
</script>

<template>
    <router-link :to="'/servers/'+ props.server.id" class="flex bg-secondary hover:bg-[#454545] hover:scale-105 rounded-xl py-4">
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