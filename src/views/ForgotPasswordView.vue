<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useFormValidation } from '@/composables/useFormValidation'

const formData = ref({
  email: '',
})

// Composables
const { forgotPassword, isLoading, error, clearError } = useAuth()
const { errors, rules, validateForm, clearErrors } = useFormValidation()

// Validation rules
const validationRules = {
  email: [rules.required('Email harus diisi'), rules.email()],
}

// State
const isEmailSent = ref(false)

// Computed
const isFormValid = computed(() => {
  return formData.value.email && !errors.value.email
})

// Methods
const handleSubmit = async () => {
  clearErrors()
  clearError()

  const isValid = validateForm(formData.value, validationRules)
  if (!isValid) return

  const result = await forgotPassword(formData.value.email)

  if (result.success) {
    isEmailSent.value = true
  }
}

const clearFieldError = () => {
  if (errors.value.email) {
    delete errors.value.email
  }
  if (error.value) {
    clearError()
  }
}
</script>

<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
    <div class="card bg-base-100 shadow-xl w-full max-w-md">
      <div class="card-body">
        <div class="flex items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h2 class="card-title text-2xl">Reset Password</h2>
        </div>

        <!-- Success Message -->
        <div v-if="isEmailSent" class="alert alert-success mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 class="font-bold">Email sent!</h3>
            <div class="text-xs">Check your email for password reset instructions.</div>
          </div>
        </div>

        <!-- Error Alert -->
        <div v-if="error" class="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ error.message }}</span>
        </div>

        <div v-if="!isEmailSent">
          <p class="text-base-content/70 mb-6">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          <form @submit.prevent="handleSubmit">
            <div class="form-control w-full mb-4">
              <label class="label" for="email">
                <span class="label-text">Email Address</span>
              </label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                @input="clearFieldError"
                placeholder="Enter your email"
                class="input input-bordered w-full"
                :class="{ 'input-error': errors.email }"
                required
              />
              <div v-if="errors.email" class="label">
                <span class="label-text-alt text-error">{{ errors.email }}</span>
              </div>
            </div>

            <div class="form-control mt-6">
              <button
                type="submit"
                class="btn btn-primary"
                :class="{ loading: isLoading }"
                :disabled="isLoading || !isFormValid"
              >
                <span v-if="!isLoading">Send Reset Email</span>
                <span v-else>Sending...</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Back to Login -->
        <div class="divider"></div>
        <div class="text-center">
          <RouterLink to="/login" class="link link-hover text-primary"> Back to Login </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
