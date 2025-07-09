export default defineNuxtRouteMiddleware((to, from) => {
  const { $store } = useNuxtApp()

  // If user is already authenticated, redirect to dashboard
  if (useNuxtApp().$client && $store.getters['auth/isAuthenticated']) { 
    return navigateTo('/dashboard')
  }
}) 