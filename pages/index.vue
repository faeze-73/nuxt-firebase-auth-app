<template>
  <div class="min-vh-100 bg-light d-flex align-items-center">
    <div class="container">
      <div class="text-center">
        <h1 class="mb-4 text-primary">Welcome to the authentication app.</h1>
        
        <div v-if="!typedStore.getters['auth/isAuthenticated']" class="card mx-auto shadow" style="max-width: 400px;">
          <div class="card-header bg-primary text-white text-center">
            <h5 class="mb-0">Start</h5>
          </div>
          <div class="card-body">
            <p class="card-text mb-4">To use the dashboard, first log in or register.</p>
            <div class="d-grid gap-2">
              <NuxtLink to="/login" class="btn btn-primary btn-lg">
                Login
                <i class="bi bi-box-arrow-in-right me-2"></i>
              </NuxtLink>
              <NuxtLink to="/register" class="btn btn-outline-primary btn-lg">
                Sign up
                <i class="bi bi-person-plus me-2"></i>
              </NuxtLink>
            </div>
          </div>
        </div>
        
        <div v-else class="card mx-auto shadow" style="max-width: 400px;">
          <div class="card-header bg-success text-white text-center">
            <h5 class="mb-0">Welcome</h5>
          </div>
          <div class="card-body">
            <p class="card-text mb-4">You have successfully logged in.</p>
            <NuxtLink to="/dashboard" class="btn btn-success btn-lg w-100">
              <i class="bi bi-speedometer2 me-2"></i>
              Go to dashboard.
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from '../store'
import type { StoreType } from '../store'
const typedStore = store as StoreType

// Initialize auth state
onMounted(async () => {
  await typedStore.dispatch('auth/initAuth')
})

// Redirect to dashboard if already authenticated
watchEffect(() => {
  if (process.client && typedStore.getters['auth/isAuthenticated']) {
    navigateTo('/dashboard')
  }
})
</script>

<style scoped>
.card {
  border: none;
  border-radius: 1rem;
}

.card-header {
  border-radius: 1rem 1rem 0 0 !important;
}

.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
}

.shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
</style> 