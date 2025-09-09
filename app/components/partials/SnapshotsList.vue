<script setup lang="ts">
import type { Image } from '~~/types/HetznerCloudApi/CloudServer';

const props = defineProps<{
  snapshots: Image[]
}>();

defineEmits<{
  (e: 'deploy', snapshot: Image): void
}>();
</script>

<template>
  <div class="flex justify-center align-middle border-b-2 py-2">
    <p class="text-center w-[8%]">Estado</p>
    <p class="text-center w-[30%]">Nombre</p>
    <p class="text-center w-[10%]">Tipo</p>
    <p class="text-center w-[16%]">Capacidad</p>
    <p class="text-center w-[16%]">Precio</p>
    <p class="text-center w-[20%]">Creación</p>
    <p class="text-center w-[10%]">Acción</p>
  </div>
  <div
    v-if="props.snapshots.length === 0"
    class="text-center text-gray-400"
  >
    No hay servidores disponibles.
  </div>
  <div
    v-else
    class="flex flex-col gap-y-4"
  >
    <div
      v-for="snapshot in props.snapshots"
      :key="snapshot.id"
    >
      <SnapshotItem
        :snapshot="snapshot"
      >
        <button
          class="bg-[#202020] px-2 rounded-lg hover:scale-110"
          @click="$emit('deploy', snapshot)"
        >
          Cargar
        </button>
      </SnapshotItem>
    </div>
  </div>
</template>
