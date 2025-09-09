<script setup lang="ts">
import { useServers } from '~/composables/useServers';
import ServersList from '~/components/partials/ServersList.vue';
import SnapshotsList from '~/components/partials/SnapshotsList.vue';
import type { CloudServer, Image } from '~~/types/HetznerCloudApi/CloudServer';

definePageMeta({
  middleware: 'auth',
});

const servers = useServers();
const serversList = ref<CloudServer[]>([]);
const snapshots = ref<Image[]>([]);

const deploySnapshot = async (snapshot: Image) => {
  const newServer = await servers.deploySnapshot(snapshot.id);
  if (newServer) {
    serversList.value.push(newServer);
  }
};

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
          @deploy="deploySnapshot"
        />
      </div>
    </div>
  </div>
</template>
