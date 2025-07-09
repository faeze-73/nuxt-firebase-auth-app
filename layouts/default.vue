<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <NuxtLink to="/" class="navbar-brand">
          Frontend Test App
        </NuxtLink>
        
        <div class="navbar-nav ms-auto" v-if="$store.getters['auth/isAuthenticated']">
          <span class="navbar-text me-3">
            welcome: {{ $store.getters['auth/userEmail'] }}
          </span>
          <button 
            @click="handleLogout" 
            class="btn btn-outline-light btn-sm"
            :disabled="$store.state.auth.loading"
          >
            <span v-if="$store.state.auth.loading" class="spinner-border spinner-border-sm me-1"></span>
            Log out
          </button>
        </div>
        
        <div class="navbar-nav ms-auto" v-else>
          <NuxtLink to="/login" class="nav-link">Sign in</NuxtLink>
          <NuxtLink to="/register" class="nav-link">Sign up</NuxtLink>
        </div>
      </div>
    </nav>
    
    <main class="container mt-4">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { $store } = useNuxtApp()

const handleLogout = async () => {
  await $store.dispatch('auth/logout')
}

// Initialize auth state on mount
onMounted(async () => {
  await $store.dispatch('auth/initAuth')
})
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
}

.navbar-text {
  color: rgba(255, 255, 255, 0.8) !important;
}
</style> 