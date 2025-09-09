<script setup lang="ts">
import type { CloudServer } from '../../types/HetznerCloudApi/CloudServer';

const props = defineProps<{
  server: CloudServer
}>();

const currentLocationPrice = props.server.server_type.prices.find(price => price.location === props.server.datacenter.location.name);
const creationTimestamp = new Date(props.server.created);
const firstSeenTimestamp = props.server.labels.first_seen ? new Date(props.server.labels.first_seen.replaceAll('_', ':')) : creationTimestamp;
</script>

<template>
  <div class="flex bg-secondary hover:bg-[#454545] hover:scale-105 rounded-xl py-4">
    <p class="flex w-[8%] justify-center align-middle">
      <StatusIndicator :status="props.server.status" />
    </p>
    <p class="text-center w-[23%]">{{ props.server.name }}</p>
    <p class="text-center w-[19%]">{{ props.server.public_net.ipv4.ip }}</p>
    <p class="text-center w-[12%]">{{ props.server.server_type.cores }} cores | {{ props.server.server_type.memory }}GB</p>
    <p class="text-center w-[12%]">{{ currentLocationPrice ? Math.round(currentLocationPrice.price_hourly.net * 100) / 100 : 'N/A' }}€</p>
    <p class="text-center w-[14%]">{{ dateToTimeAgo(creationTimestamp) }}</p>
    <p class="text-center w-[14%]">{{ dateToTimeAgo(firstSeenTimestamp) }}</p>
  </div>
</template>
