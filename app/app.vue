<script setup>
const cfg = useRuntimeConfig();

useHead({
  title: cfg.public.appName + ' - Inicio',
  lang: 'es',
  meta: [{
    name: 'robots',
    content: 'noindex, nofollow',
  }],
});
</script>

<template>
  <div class="bg-primary text-white">
    <div class="min-h-[100vh] max-w-6xl mx-auto px-4">
      <AppNavbar />
      <NuxtPage />
      <AppFooter />
    </div>
  </div>
</template>
