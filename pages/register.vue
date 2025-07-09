<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title mb-0">Sign Up</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="handleRegister">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="form-control"
                :class="{ 
                  'is-invalid': v$.email.$error,
                  'is-valid': !v$.email.$invalid && v$.email.$dirty
                }"
                placeholder="your@email.com"
                autocomplete="email"
                @blur="v$.email.$touch()"
              />
              <div v-if="v$.email.$error" class="invalid-feedback">   
                <div v-for="error in v$.email.$errors" :key="error.$uid">
                  {{ error.$message }}
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                v-model="formData.password"
                type="password"
                class="form-control"
                :class="{ 
                  'is-invalid': v$.password.$error,
                  'is-valid': !v$.password.$invalid && v$.password.$dirty
                }"
                placeholder="Enter a strong password"
                autocomplete="new-password"
                @blur="v$.password.$touch()"
              />
              
              <div v-if="v$.password.$error" class="invalid-feedback">
                <div v-for="error in v$.password.$errors" :key="error.$uid">
                  {{ error.$message }}
                </div>
              </div>
              
              <!-- Password requirements help text -->
              <div class="form-text mt-2">
                <small class="text-muted">
                  Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters (@$!%*?&).
                </small>
              </div>
            </div>

            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input
                id="confirmPassword"
                v-model="formData.confirmPassword"
                type="password"
                class="form-control"
                :class="{ 
                  'is-invalid': v$.confirmPassword.$error,
                  'is-valid': !v$.confirmPassword.$invalid && v$.confirmPassword.$dirty
                }"
                placeholder="Confirm your password"
                autocomplete="new-password"
                @blur="v$.confirmPassword.$touch()"
              />
              <div v-if="v$.confirmPassword.$error" class="invalid-feedback">
                <div v-for="error in v$.confirmPassword.$errors" :key="error.$uid">
                  {{ error.$message }}
                </div>
              </div>
            </div>

            <div class="text-danger mb-3" v-if="error">
              {{ error }}
            </div>

            <button
              type="submit"
              class="btn btn-primary w-100"
              :disabled="loading || v$.$invalid"
            >
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
              Sign Up
            </button>
          </form>

          <div class="text-center mt-3">
            <p>Already have an account? <NuxtLink to="/login">Sign in</NuxtLink></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs, helpers } from '@vuelidate/validators'
import { strongEmail, strongPassword, englishMessages } from '~/utils/validators'

// Auth middleware
definePageMeta({
  middleware: 'guest'
})

const { $store } = useNuxtApp()

// Form data
const formData = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

// Validation rules
const rules = computed(() => ({
  email: { 
    required: helpers.withMessage(englishMessages.required, required),
    strongEmail: strongEmail
  },
  password: { 
    required: helpers.withMessage(englishMessages.required, required),
    strongPassword: strongPassword
  },
  confirmPassword: { 
    required: helpers.withMessage(englishMessages.required, required),
    sameAsPassword: helpers.withMessage(englishMessages.sameAs, sameAs(computed(() => formData.password)))
  }
}))

// Vuelidate setup
const v$ = useVuelidate(rules, formData)

// Computed properties from store
const loading = computed(() => $store.state.auth.loading)
const error = computed(() => $store.state.auth.error)

// Form submission
const handleRegister = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  await $store.dispatch('auth/register', {
    email: formData.email,
    password: formData.password
  })

  // Redirect on success
  if (!$store.state.auth.error) {
    await navigateTo('/dashboard')
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}
</style> 