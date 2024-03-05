
import { NuxtPage } from '#build/components';

<script setup>
  useHead({
    title: 'Hetzner Scaler by Gambus',
    meta: [{
      name: 'robots',
      content: 'noindex, nofollow'
    }]
})
</script>

<template>
  <div class="bg-primary text-white">
    <div class="min-h-[100vh] max-w-6xl mx-auto px-4">
      <Navbar />
      <NuxtPage />
      <Footer />
    </div>
  </div>
</template>
