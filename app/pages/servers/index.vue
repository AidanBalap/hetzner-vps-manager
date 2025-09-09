<script setup lang="ts">
import { useServers } from '~/composables/useServers';
import ServersList from '~/components/partials/ServersList.vue';
import SnapshotsList from '~/components/partials/SnapshotsList.vue';
import type { CloudServer, Image } from '~~/types/HetznerCloudApi/CloudServer';

const { $toast } = useNuxtApp();
const { status } = useAuth();
const isAuthenticated = status.value === 'authenticated';

// Redirect if not authenticated
if (!isAuthenticated) {
  $toast.error('Necesitas estar autentificado');
  await navigateTo('/');
}

const servers = useServers();
const serversList = ref<CloudServer[]>([]);
const snapshots = ref<Image[]>([]);

// Fetch snapshots on component mount
onMounted(async () => {
  updatePageTitle('Servidores');
  serversList.value = await servers.fetchServers();
  snapshots.value = await servers.fetchSnapshots();
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
