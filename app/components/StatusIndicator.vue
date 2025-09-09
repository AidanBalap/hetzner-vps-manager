<script setup lang="ts">
const statusColors = {
  // Server status
  initializing: 'bg-blue-500',
  starting: 'bg-blue-500',
  running: 'bg-green-500',
  stopping: 'bg-yellow-500',
  off: 'bg-red-500',
  migrating: 'bg-yellow-500',
  rebuilding: 'bg-yellow-500',
  deleting: 'bg-red-500',

  // Snapshot status
  available: 'bg-green-500',
  creating: 'bg-yellow-500',

  default: 'bg-gray-500',
};

const props = defineProps<{
  status: keyof typeof statusColors
}>();

const displayedColor = ref(statusColors[props.status] || statusColors.default);
</script>

<template>
  <span
    class="block size-6 rounded-full"
    :class="displayedColor"
  />
</template>
