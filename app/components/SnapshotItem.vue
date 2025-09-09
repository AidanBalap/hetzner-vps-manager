<script setup lang="ts">
import type { Image } from '~~/types/HetznerCloudApi/CloudServer';

const props = defineProps<{
  snapshot: Image
}>();

const creationTimestamp = new Date(props.snapshot.created);
</script>

<template>
  <div class="flex bg-secondary rounded-xl py-4">
    <p class="flex w-[8%] justify-center align-middle">
      <StatusIndicator :status="props.snapshot.status" />
    </p>
    <p class="text-center w-[30%]">{{ props.snapshot.description }}</p>
    <p class="text-center w-[10%]">{{ props.snapshot.labels.server_type }}</p>
    <p class="text-center w-[16%]">{{ Math.round(((props.snapshot.image_size ?? 0) * 100) / 100) }} / {{ props.snapshot.disk_size }} GB</p>
    <p class="text-center w-[16%]">{{ Math.round(((props.snapshot.image_size ?? 0) * 0.011) * 1000) / 1000 }}€/mes</p>
    <p class="text-center w-[20%]">{{ dateToTimeAgo(creationTimestamp) }}</p>
    <div class="flex justify-center text-center w-[10%]">
      <slot />
    </div>
  </div>
</template>
