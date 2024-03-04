<script setup>
    const authToken = useCookie('auth')
    authToken.value = ''
    await navigateTo('/setToken')
</script>