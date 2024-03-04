
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
  <div class="bg-slate-500 h-[100vh]">
    <div class="max-w-5xl mx-auto">
      <Navbar />
      <NuxtPage />
      <Footer />
    </div>
  </div>
</template>
