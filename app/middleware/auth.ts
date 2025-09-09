export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();
  const isAuthenticated = status.value === 'authenticated';

  if (!isAuthenticated) {
    const { $toast } = useNuxtApp();
    $toast.error('Necesitas estar autentificado');
    return navigateTo('/');
  }
});
