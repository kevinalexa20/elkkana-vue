<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'
import { ENV } from '@/config/env'

const hasError = ref(false)
const errorMessage = ref('')
const errorStack = ref('')
const reportSent = ref(false)
const router = useRouter()

onErrorCaptured((error, instance, info) => {
  console.error('🚨 Error caught by boundary:', {
    error,
    component: instance?.$options.name || 'Unknown',
    info,
  })

  hasError.value = true
  errorMessage.value = error.message || 'An unexpected error occurred'
  errorStack.value = error.stack || ''

  // Send to error tracking service in production
  if (ENV.features.enableErrorTracking) {
    // Example: Sentry.captureException(error, { extra: { info, component: instance?.$options.name } })
    reportSent.value = true
  }

  return false // Prevent error from bubbling up
})

const retry = () => {
  hasError.value = false
  errorMessage.value = ''
  errorStack.value = ''
  reportSent.value = false
}

const goHome = () => {
  retry()
  router.push('/')
}
</script>

<template>
  <div v-if="hasError" class="min-h-screen bg-base-200 flex items-center justify-center p-4">
    <!-- Error UI -->
    <div class="card bg-base-100 shadow-xl max-w-lg w-full">
      <div class="card-body text-center">
        <div class="text-6xl mb-4">😵</div>
        <h2 class="card-title justify-center text-error mb-2">Oops! Something went wrong</h2>
        <p class="text-base-content/70 mb-4">
          {{ errorMessage }}
        </p>

        <!-- Development-only error details -->
        <div
          v-if="ENV.features.enableErrorBoundaryDetails && errorStack"
          class="mockup-code text-left mb-4"
        >
          <pre><code>{{ errorStack }}</code></pre>
        </div>

        <div class="card-actions justify-center space-x-2">
          <button @click="retry" class="btn btn-primary">Try Again</button>
          <button @click="goHome" class="btn btn-outline">Go Home</button>
        </div>

        <div v-if="reportSent" class="alert alert-success mt-4">
          <span>Error report sent to our team</span>
        </div>
      </div>
    </div>
  </div>

  <slot v-else />
</template>
