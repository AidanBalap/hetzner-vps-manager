<script setup lang="ts">
    const props = defineProps(['server'])
    const timestamp = new Date(props.server.created)
    
    // format date with this 2024-11-06_10-10-00 -> 2024-11-06 10:10:00
    const fsTimestamp = props.server.labels.first_seen.split('_')
    const fsHour = fsTimestamp[1].replaceAll('-', ':') + '+00:00'
    const firstSeenTimestampStr = fsTimestamp[0] + 'T' + fsHour


    console.log(firstSeenTimestampStr)
    const firstSeenTimestamp = new Date(firstSeenTimestampStr)

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
        <p class="text-center w-[12%]">{{ props.server.specs.cores }} cores | {{ props.server.specs.memory }}GB</p>
        <p class="text-center w-[12%]">{{ Math.round(props.server.price.monthly * 100) / 100 }}€</p>
        <p class="text-center w-[14%]">{{ dateToTimeAgo(timestamp) }}</p>
        <p class="text-center w-[14%]">{{ dateToTimeAgo(firstSeenTimestamp) }}</p>
    </router-link>
</template>