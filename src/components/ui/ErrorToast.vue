<template>
  <div v-if="show && message" class="toast toast-top toast-end z-[9999]">
    <div class="alert alert-error shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current flex-shrink-0 h-6 w-6"
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
        <span>{{ message }}</span>
      </div>
      <div class="flex-none">
        <button @click="close" class="btn btn-sm btn-ghost">×</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useErrorHandler } from '@/composables/useErrorHandler'

const { error, clearError } = useErrorHandler()

onMounted(() => {
  console.log('🧪 ErrorToast mounted - DaisyUI version')
})

const show = computed(() => {
  const hasError = !!error.value
  console.log('🧪 Toast show:', hasError, 'message:', error.value)
  return hasError
})

const message = computed(() => error.value)

const close = () => {
  console.log('🧪 Toast close clicked')
  clearError()
}

watch(error, (newError) => {
  console.log('🧪 Error changed:', newError)
  if (newError) {
    // Auto-close after 5 seconds
    setTimeout(() => {
      if (error.value === newError) {
        clearError()
      }
    }, 5000)
  }
})
</script>
