import store, { type StoreType } from '../store'

export default defineNuxtRouteMiddleware((to) => {
  const typedStore = store as StoreType
  
  // Wait for auth initialization
  if (process.client && !typedStore.state.auth.user) {
    return navigateTo('/login')
  }
}) 