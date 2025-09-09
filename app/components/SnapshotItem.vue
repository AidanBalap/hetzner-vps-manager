<script setup lang="ts">
import type { Image } from '~/types/HetznerCloudApi/CloudServer';

const { $toast } = useNuxtApp();

const authToken = useCookie('auth');
const props = defineProps<{ snapshot: Image }>();
const timestamp = new Date(props.snapshot.created);

const deploySnapshot = async () => {
  const response = await fetch('/api/snapshots/' + props.snapshot.id + '/deploy', { method: 'POST' });

  if (response.status != 200) {
    $toast.error('Error al lanzar el servidor');
    return;
  }

  const data = await response.json();
  const serverId = data.server.id;

  $toast.success('Servidor lanzado correctamente con ID: ' + serverId);
  await navigateTo('/servers/' + serverId);
};
</script>

<template>
  <div class="flex bg-secondary rounded-xl py-4">
    <p class="flex w-[8%] justify-center align-middle">
      <StatusIndicator :status="props.snapshot.status" />
    </p>
    <p class="text-center w-[30%]">
      {{ props.snapshot.description }}
    </p>
    <p class="text-center w-[10%]">
      {{ props.snapshot.labels.server_type }}
    </p>
    <p class="text-center w-[16%]">
      {{ Math.round(((props.snapshot.image_size ?? 0) * 100) / 100) }} / {{ props.snapshot.disk_size }} GB
    </p>
    <p class="text-center w-[16%]">
      {{ Math.round(((props.snapshot.image_size ?? 0) * 0.011) * 1000) / 1000 }}€/mes
    </p>
    <p class="text-center w-[20%]">
      {{ dateToTimeAgo(timestamp) }}
    </p>
    <div class="flex justify-center text-center w-[10%]">
      <button
        class="bg-[#202020] px-2 rounded-lg hover:scale-110"
        @click="deploySnapshot()"
      >
        Cargar
      </button>
    </div>
  </div>
</template>
