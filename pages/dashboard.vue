<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <div class="card">
        <div class="card-header text-center">
          <h4>User Dashboard</h4>
        </div>
        <div class="card-body">
          <div class="text-center mb-4">
            <div class="avatar-circle mx-auto mb-3">
              <i class="bi bi-person-fill"></i>
            </div>
            <h5 class="card-title">Welcome!</h5>
            <p class="text-muted">You have successfully logged in.</p>
          </div>

          <div class="user-info">
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Email:</strong>
              </div>
              <div class="col-sm-8" dir="ltr">
                <span class="badge bg-primary">{{ store.getters['auth/userEmail'] }}</span>
              </div>
            </div>
            
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Status:</strong>
              </div>
              <div class="col-sm-8">
                <span class="badge bg-success">Active</span>
              </div>
            </div>
            
            <div class="row mb-3">
              <div class="col-sm-4">
                <strong>Login Time:</strong>
              </div>
              <div class="col-sm-8">
                <span class="text-muted">{{ formatDate(new Date()) }}</span>
              </div>
            </div>
          </div>

          <hr>

          <!-- Success Message -->
          <div v-if="showSuccessMessage" class="alert alert-success mt-3" role="alert">
            <i class="bi bi-check-circle-fill me-2"></i>
            Data refreshed successfully!
          </div>
        </div>
      </div>

      <!-- Additional Info Card -->
      <div class="card mt-4">
        <div class="card-header">
          <h6 class="mb-0">Additional Information</h6>
        </div>
        <div class="card-body">
          <div class="row text-center">
            <div class="col-4">
              <div class="stat-item">
                <div class="stat-number">1</div>
                <div class="stat-label">Active Accounts</div>
              </div>
            </div>
            <div class="col-4">
              <div class="stat-item">
                <div class="stat-number">{{ loginCount }}</div>
                <div class="stat-label">Login Count</div>
              </div>
            </div>
            <div class="col-4">
              <div class="stat-item">
                <div class="stat-number">100%</div>
                <div class="stat-label">Security</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: 'auth'
})

// Access store directly from Nuxt app
const { $store } = useNuxtApp()
const store = $store

const isRefreshing = ref(false)
const showSuccessMessage = ref(false)
const loginCount = ref(1)

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Initialize data on mount
onMounted(() => {
  const storedCount = localStorage.getItem('loginCount')
  if (storedCount) {
    loginCount.value = parseInt(storedCount) + 1
  }
  localStorage.setItem('loginCount', loginCount.value.toString())
})
</script>

<style scoped>
.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
}

.user-info {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.stat-item {
  padding: 1rem 0;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #0d6efd;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6c757d;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border: none;
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-bottom: none;
}

.badge {
  font-size: 0.875rem;
}

@media (max-width: 576px) {
  .d-md-flex {
    flex-direction: column;
  }
  
  .d-md-flex .btn {
    margin-bottom: 0.5rem;
  }
}
</style> 