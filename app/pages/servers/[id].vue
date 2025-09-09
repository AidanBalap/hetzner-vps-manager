<script setup lang="ts">
import { useServerActions } from '~/composables/useServerActions';
import type { CloudServer } from '~~/types/HetznerCloudApi/CloudServer';
import type { Action } from '~~/types/HetznerCloudApi/Generic';

const { status } = useAuth();
const isAuthenticated = status.value === 'authenticated';

const serverActions = useServerActions();
const server = ref<CloudServer | undefined>();
const actions = ref([] as Action[]);

const route = useRoute();
const serverId = Number(route.params.id);

const refreshData = async () => {
  console.log('[*] Refreshing data');
  const serverData = await serverActions.fetch(serverId);
  if (serverData) {
    server.value = serverData;
  }
  actions.value = await serverActions.fetchActions(serverId);
  updatePageTitle('Servidor ' + server.value?.name);
};

if (isAuthenticated) {
  setTimeout(() => {
    refreshData();
  }, 1000 * 30);

  refreshData();
}
else {
  await navigateTo('/');
}
</script>

<template>
  <div class="flex flex-col mx-auto m-8 rounded-lg justify-center align-middle">
    <h3 class="text-4xl font-bold pt-4 text-center">
      Servidor
      <span v-if="server">{{ server.name }}</span>
      <span v-else> ... </span>
      <span>🚀</span>
    </h3>

    <div
      v-if="server"
      class="flex flex-col pt-4"
    >
      <div class="flex flex-col gap-y-4 mx-10 border-b-2 pb-4">
        <div class="flex justify-center align-middle border-b-2 py-2">
          <p class="text-center w-[8%]">Estado</p>
          <p class="text-center w-[23%]">Nombre</p>
          <p class="text-center w-[19%]">IP</p>
          <p class="text-center w-[12%]">Specs</p>
          <p class="text-center w-[12%]">€/mes</p>
          <p class="text-center w-[14%]">Uso actual</p>
          <p class="text-center w-[14%]">Creación</p>
        </div>

        <ServerItem
          :server="server"
        />
      </div>
    </div>

    <div
      v-if="server"
      class="grid grid-cols-3 grid-rows-1 m-10 gap-x-8"
    >
      <div class="col-span-1 pr-6 border-r-2">
        <h3 class="text-4xl font-bold">
          ⚡ Acciones
        </h3>

        <div class="flex flex-col py-4 gap-y-4">
          <button
            class="bg-secondary/80 rounded-lg p-2 hover:scale-105 hover:underline"
            @click="serverActions.start(serverId); refreshData()"
          >
            Encender
          </button>
          <button
            class="bg-secondary/80 rounded-lg p-2 hover:scale-105 hover:underline"
            @click="serverActions.stop(serverId); refreshData()"
          >
            Apagar
          </button>
          <button
            class="bg-secondary/80 rounded-lg p-2 hover:scale-105 hover:underline"
            @click="serverActions.snapshotAndDelete(serverId)"
          >
            Congelar 🧊
          </button>
          <button
            class="bg-red-400/80 rounded-lg p-2 hover:scale-105 hover:underline"
            @click="serverActions.deleteServer(serverId)"
          >
            Borrar 🚨
          </button>
        </div>
      </div>

      <div
        v-if="server"
        class="col-span-2"
      >
        <h3 class="text-4xl font-bold pb-4">
          🧾 Ultimas acciones
        </h3>

        <div class="max-h-[400px] overflow-y-scroll">
          <ActionsList :actions="actions" />
        </div>
      </div>

      <div
        v-if="!server"
        class="flex justify-center align-middle py-40"
      >
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>
