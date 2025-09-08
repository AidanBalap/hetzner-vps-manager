<script setup lang="ts">
const { $toast } = useNuxtApp();
const servers = ref([]);

const fetchServers = async () => {
  const response = await fetch('/api/servers');

  if (response.status != 200) {
    $toast.error('Error al obtener los servidores');
    return;
  }

  servers.value = await response.json();
};

fetchServers();
</script>

<template>
  <server-list-header />
  <server-item
    v-for="server in servers"
    :key="server.id"
    :server="server"
  />
</template>
