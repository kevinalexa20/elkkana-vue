<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useErrorHandler } from '@/composables/useErrorHandler'
import { useFormValidation } from '@/composables/useFormValidation'
import { computed } from 'vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ErrorBoundary from '@/components/ui/ErrorBoundary.vue'

//form data
const formData = ref({
  email: '',
  password: '',
  rememberMe: false,
})

// Composables
const { login, isLoading, error } = useAuth()
const { errors, hasErrors, rules, validateForm, clearErrors } = useFormValidation()
const { handleError, clearError } = useErrorHandler()

// validation rules
const validationRules = {
  email: [rules.required('Email harus diisi'), rules.email()],
  password: [
    rules.required('Password harus diisi'),
    rules.minLength(8, 'Password minimal 8 karakter'),
  ],
}

//computed
const isFormValid = computed(() => {
  return formData.value.email && formData.value.password && !hasErrors.value
})

//methods
const handleSubmit = async () => {
  console.log('🔄 Form submitted with data:', {
    email: formData.value.email,
    password: '***hidden***',
    rememberMe: formData.value.rememberMe,
  })

  // Clear previous errors
  clearErrors()
  clearError()

  // Validate form - FIXED: Only validate email and password
  const isValid = validateForm(
    {
      email: formData.value.email,
      password: formData.value.password,
    },
    validationRules,
  )

  console.log('📝 Form validation result:', isValid)
  console.log('📝 Current errors:', errors.value)

  if (!isValid) {
    console.log('❌ Form validation failed')
    return
  }

  console.log('✅ Form validation passed, attempting login...')

  // Login user
  const result = await login({
    email: formData.value.email,
    password: formData.value.password,
  })

  if (result.success) {
    console.log('✅ Login successful:', result.user)
  } else {
    console.log('❌ Login failed:', result.error)
  }

  if (!result.success) {
    handleError(result.error)
  }
}

//clear field error
const clearFieldError = (field: string) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
  if (error.value) {
    clearError()
  }
}
</script>

<template>
  <ErrorBoundary>
    <div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div class="card lg:card-side bg-base-100 shadow-xl w-full max-w-4xl">
        <!-- Left Side: Image -->
        <figure class="hidden lg:flex lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1595510637895-739864fb845f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Login background"
            class="w-full h-full object-cover"
          />
        </figure>

        <!-- Right Side: Form -->
        <div class="card-body w-full lg:w-1/2">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <h2 class="card-title text-2xl">Login to your account</h2>
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

          <form @submit.prevent="handleSubmit">
            <!-- email -->
            <div class="form-control w-full mb-4">
              <label class="label" for="email">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                @input="clearFieldError('email')"
                :class="{ 'input-error': errors.email }"
                placeholder="email"
                class="input input-bordered w-full"
                required
              />
              <div v-if="errors.email" class="label">
                <span class="label-text-alt text-error">{{ errors.email }}</span>
              </div>
            </div>

            <!-- password -->
            <div class="form-control w-full mb-4">
              <label class="label" for="password">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                v-model="formData.password"
                @input="clearFieldError('password')"
                :class="{ 'input-error': errors.password }"
                placeholder="password"
                class="input input-bordered w-full"
                required
              />
              <div v-if="errors.password" class="label">
                <span class="label-text-alt text-error">{{ errors.password }}</span>
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between mb-6">
              <div class="form-control">
                <label class="label cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="formData.rememberMe"
                    class="checkbox checkbox-primary mr-2"
                  />
                  <span class="label-text">Remember me</span>
                </label>
              </div>
              <RouterLink to="/forgot-password" class="link link-hover text-sm text-primary">
                Forgot password?
              </RouterLink>
            </div>

            <!-- Submit Button -->
            <div class="form-control mt-6">
              <button
                type="submit"
                class="btn btn-primary"
                :class="{ loading: isLoading }"
                :disabled="isLoading || !isFormValid"
              >
                <span v-if="!isLoading">Login</span>
                <span v-else>Logging in...</span>
              </button>
            </div>

            <div class="divider">OR</div>

            <div class="form-control">
              <button type="button" class="btn btn-outline">
                <svg class="w-5 h-5 mr-2" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
                Login with Google
              </button>
            </div>
          </form>

          <p class="mt-6 text-center text-sm">
            Don't have an account?
            <RouterLink to="/register" class="link link-hover text-primary"
              >Create new account</RouterLink
            >
          </p>
        </div>
      </div>
    </div>
  </ErrorBoundary>
</template>
