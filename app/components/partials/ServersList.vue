<script setup lang="ts">
import type { CloudServer } from '~~/types/HetznerCloudApi/CloudServer';

const props = defineProps<{
  servers: CloudServer[]
  clickable?: boolean
}>();
</script>

<template>
  <div class="flex justify-center align-middle border-b-2 py-2">
    <p class="text-center w-[8%]">Estado</p>
    <p class="text-center w-[23%]">Nombre</p>
    <p class="text-center w-[19%]">IP</p>
    <p class="text-center w-[12%]">Specs</p>
    <p class="text-center w-[12%]">€/mes</p>
    <p class="text-center w-[14%]">Uso actual</p>
    <p class="text-center w-[14%]">Creación</p>
  </div>
  <div
    v-if="props.servers.length === 0"
    class="text-center text-gray-400"
  >
    No hay servidores disponibles.
  </div>
  <div
    v-else
    class="flex flex-col gap-y-4"
  >
    <div
      v-for="server in props.servers"
      :key="server.id"
    >
      <router-link
        v-if="props.clickable"
        :to="'/servers/'+ server.id"
      >
        <ServerItem
          :server="server"
        />
      </router-link>
      <div v-else>
        <ServerItem
          :server="server"
        />
      </div>
    </div>
  </div>
</template>
