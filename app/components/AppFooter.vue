<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="flex px-1 py-4 justify-between align-middle border-t-2">
    <p>&copy; Aidan Balasch Pérez - {{ currentYear }}</p>

    <div>
      <a
        href="https://github.com/aidanbalap/hetzner-vps-manager"
        class="rounded-xl py-1 px-2 hover:bg-secondary/80 hover:underline"
        rel="noopener noreferrer"
        target="_blank"
      >
        Github
      </a>
    </div>
  </footer>
</template>
