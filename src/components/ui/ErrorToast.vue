<!-- filepath: /home/kev/Documents/project/elkkana-vue/src/components/ui/ErrorToast.vue -->
<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-x-full"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 translate-x-full"
  >
    <div v-if="error" class="toast toast-top toast-end z-50">
      <div class="alert alert-error shadow-lg max-w-sm">
        <!-- Error Icon -->
        <div class="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current h-6 w-6"
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
        </div>

        <!-- Error Message -->
        <div class="flex-1">
          <span class="text-sm font-medium">{{ error }}</span>
        </div>

        <!-- Close Button -->
        <div class="flex-shrink-0">
          <button
            @click="handleClose"
            class="btn btn-sm btn-circle btn-ghost hover:bg-red-200/20"
            aria-label="Close error message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps<{
  error: string | null
  autoClose?: boolean
  duration?: number
}>()

// Emits
const emit = defineEmits<{
  clear: []
}>()

// Auto close timer
let autoCloseTimer: number | null = null

// Methods
const handleClose = () => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
    autoCloseTimer = null
  }
  emit('clear')
}

// Auto close functionality
onMounted(() => {
  if (props.error && props.autoClose !== false) {
    const duration = props.duration || 5000 // Default 5 seconds
    autoCloseTimer = setTimeout(() => {
      handleClose()
    }, duration)
  }
})

onUnmounted(() => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
  }
})
</script>
