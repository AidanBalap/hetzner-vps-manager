<script setup lang="ts">
import type { CloudServer } from '../../types/HetznerCloudApi/CloudServer';

const props = defineProps<{ server: CloudServer }>();
const timestamp = new Date(props.server.created);
let firstSeenTimestamp;

// format date with this 2024-11-06_10-00-00Z -> 2024-11-06 10:00:00
if (props.server.labels.first_seen) {
  const [datePart, timePartWithZ] = props.server.labels.first_seen.split('_');
  const timePart = timePartWithZ.replace(/-/g, ':').replace('Z', '');

  const isoString = `${datePart}T${timePart}Z`;
  const parsedDate = new Date(isoString);

  firstSeenTimestamp = isNaN(parsedDate.getTime()) ? timestamp : parsedDate;
}
else {
  firstSeenTimestamp = timestamp;
}
</script>

<template>
  <router-link
    :to="'/servers/'+ props.server.id"
    class="flex bg-secondary hover:bg-[#454545] hover:scale-105 rounded-xl py-4"
  >
    <p class="flex w-[8%] justify-center align-middle">
      <StatusIndicator :status="props.server.status" />
    </p>
    <p class="text-center w-[23%]">{{ props.server.name }}</p>
    <p class="text-center w-[19%]">{{ props.server.public_net.ipv4.ip }}</p>
    <p class="text-center w-[12%]">{{ props.server.server_type.cores }} cores | {{ props.server.server_type.memory }}GB</p>
    <p class="text-center w-[12%]">{{ Math.round(props.server.server_type.prices[0].price_hourly.net * 100) / 100 }}€</p>
    <p class="text-center w-[14%]">{{ dateToTimeAgo(timestamp) }}</p>
    <p class="text-center w-[14%]">{{ dateToTimeAgo(firstSeenTimestamp) }}</p>
  </router-link>
</template>
