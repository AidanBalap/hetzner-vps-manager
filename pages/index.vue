<script setup>
    const { $toast } = useNuxtApp();
    const { data } = useAuth();

    console.log(data)
    if (data) {
        // $toast.success('Bienvenido, ' + data)
    }

</script>

<template>
    <div class="py-20">
        <h1 class="text-4xl font-bold text-center">Hola !</h1>

        <div v-if="data">
            <p>Bienvenido capo.</p>
        </div>

        <div v-else>
            <p>Conectese!</p>
        </div>
    </div>
</template>