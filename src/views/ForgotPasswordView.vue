<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const email = ref('')

const handleSubmit = () => {
  // Logika untuk mengirim email reset password
  console.log('Password reset requested for:', email.value)
  alert('Jika email terdaftar, instruksi reset password akan dikirimkan.')
  // Redirect atau tampilkan pesan sukses
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
          <h2 class="card-title text-2xl">Forgot Password</h2>
        </div>
        <p class="mb-6 text-sm text-base-content/70">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form @submit.prevent="handleSubmit">
          <div class="form-control w-full mb-4">
            <label class="label" for="email">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="your.email@example.com"
              required
              class="input input-bordered w-full"
            />
          </div>

          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">Send Reset Link</button>
          </div>
        </form>

        <p class="mt-6 text-center text-sm">
          Remember your password?
          <RouterLink to="/login" class="link link-hover text-secondary">Login here</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
