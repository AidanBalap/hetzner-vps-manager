<script setup lang="ts">
import type { Action } from '../../types/HetznerCloudApi/Generic';

const props = defineProps<{ actions: Action[] }>();
</script>

<template>
  <table>
    <thead>
      <tr>
        <th class="w-[25%]">
          Comando
        </th>
        <th class="w-[15%]">
          Estado
        </th>
        <th class="w-[10%]">
          Progreso
        </th>
        <th class="w-[25%]">
          Inicio
        </th>
        <th class="w-[25%]">
          Fin
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="action in props.actions"
        :key="action.id"
      >
        <td class="text-center text-white/70">
          {{ action.command }}
        </td>
        <td class="text-center text-white/70">
          {{ action.status }}
        </td>
        <td class="text-center text-white/70">
          {{ action.progress }}
        </td>
        <td class="text-center text-white/70">
          {{ new Date(action.started).toLocaleString('es') }}
        </td>
        <td
          v-if="action.finished"
          class="text-center text-white/70"
        >
          {{ dateToTimeAgo(new Date(action.finished)) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
