<script setup lang="ts">
import { useServers } from '~/composables/useServers';

const cfg = useRuntimeConfig();
const { $toast } = useNuxtApp();
const { status } = useAuth();
const isAuthenticated = status.value === 'authenticated';

// Redirect if not authenticated
if (!isAuthenticated) {
  $toast.error('Necesitas estar autentificado');
  await navigateTo('/');
}

const servers = useServers();
const snapshots = ref([]);
const serversList = ref([]);

// Fetch snapshots on component mount
onMounted(async () => {
  useHead({
    title: `${cfg.public.appName} - Lista de Servidores`,
  });

  snapshots.value = await servers.fetchSnapshots();
  serversList.value = await servers.fetchServers();
});
</script>

<template>
  <div class="flex flex-col gap-y-20 py-12">
    <div>
      <h3 class="text-3xl font-bold pb-4">
        🚀 Servidores activos :
      </h3>

      <div class="flex flex-col gap-y-4">
        <ServersList
          :servers="serversList"
          :clickable="true"
        />
      </div>
    </div>

    <div>
      <h3 class="text-3xl font-bold pb-4">
        🧊 Servidores en frio :
      </h3>

      <div class="flex flex-col gap-y-4">
        <SnapshotsList
          :snapshots="snapshots"
        />
      </div>
    </div>
  </div>
</template>
