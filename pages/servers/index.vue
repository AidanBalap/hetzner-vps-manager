<script setup>
    const cfg = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const { status } = useAuth()
    const isAuthenticated = status.value === 'authenticated'
    
    const snapshots = ref([])

    const fetchSnapshots = async () => {
        const response = await fetch('/api/snapshots')

        if (response.status != 200) {
            $toast.error('Error al obtener los snapshots')
            return
        }

        snapshots.value = await response.json()
    }

    if (isAuthenticated) {
        useHead({
            title: cfg.public.appName + '- Lista de Servidores'
        })
        
        fetchSnapshots()
    } else {
        $toast.error("Necesitas estar autentificado")
        await navigateTo('/')
    }
</script>

<template>
    <div class="flex flex-col gap-y-20 py-12">
        <div>
            <h3 class="text-3xl font-bold pb-4">🚀 Servidores activos :</h3>
        
            <div class="flex flex-col gap-y-4">
                <server-list />
            </div>
        </div>

        <div>
            <h3 class="text-3xl font-bold pb-4">🧊 Servidores en frio :</h3>
        
            <div class="flex flex-col gap-y-4">
                <div class="flex justify-center align-middle border-b-2 py-2">
                    <p class="text-center w-[8%]">Estado</p>
                    <p class="text-center w-[30%]">Nombre</p>
                    <p class="text-center w-[10%]">Tipo</p>
                    <p class="text-center w-[16%]">Capacidad</p>
                    <p class="text-center w-[16%]">Precio</p>
                    <p class="text-center w-[20%]">Creación</p>
                    <p class="text-center w-[10%]">Acción</p>
                </div>

                <snapshot-item v-for="snapshot in snapshots" :key="snapshot.id" :snapshot="snapshot" />
            </div>
        </div>
    </div>
</template>