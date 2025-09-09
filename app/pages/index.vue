<script setup>
const cfg = useRuntimeConfig();
const { status, data, signIn } = useAuth();
const isSignedIn = computed(() => status.value === 'authenticated');
</script>

<template>
  <div>
    <h1 class="text-4xl py-20 font-bold text-center">
      Bienvenido a {{ cfg.public.appName }}!
    </h1>
    <div class="pb-10 px-4">
      <p v-if="isSignedIn">
        Estás conectado como {{ data.user.name }}.
      </p>

      <div
        v-else
        class="flex gap-x-4"
      >
        <p>Conectese para acceder a la lista de servidores:</p>
        <button
          class="underline"
          @click="signIn('discord')"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  </div>
</template>
