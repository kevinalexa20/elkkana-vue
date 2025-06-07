<template>
  <Transition
    enter-active-class="transition-all duration-200 ease-out"
    enter-from-class="opacity-0 transform -translate-y-1 scale-95"
    enter-to-class="opacity-100 transform translate-y-0 scale-100"
    leave-active-class="transition-all duration-150 ease-in"
    leave-from-class="opacity-100 transform translate-y-0 scale-100"
    leave-to-class="opacity-0 transform -translate-y-1 scale-95"
  >
    <div v-if="error" class="validation-error" :class="errorClasses">
      <!-- Icon -->
      <component v-if="showIcon" :is="errorIcon" class="w-4 h-4 flex-shrink-0 mt-0.5" />

      <!-- Multiple errors -->
      <div v-if="Array.isArray(error)" class="space-y-1">
        <div v-for="(err, index) in error" :key="index" class="flex items-start gap-1">
          <span class="block w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0"></span>
          <span class="text-sm leading-tight">{{ err }}</span>
        </div>
      </div>

      <!-- Single error -->
      <span v-else class="text-sm leading-tight">{{ error }}</span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// DaisyUI compatible icons
const ErrorIcon = {
  template: `
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>
  `,
}

const WarningIcon = {
  template: `
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>
  `,
}

const InfoIcon = {
  template: `
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
    </svg>
  `,
}

interface Props {
  error?: string | string[] | null
  variant?: 'error' | 'warning' | 'info'
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'error',
  showIcon: true,
  size: 'sm',
})

const errorIcon = computed(() => {
  switch (props.variant) {
    case 'warning':
      return WarningIcon
    case 'info':
      return InfoIcon
    case 'error':
    default:
      return ErrorIcon
  }
})

const errorClasses = computed(() => {
  const base = 'flex items-start gap-2 mt-1'

  const variants = {
    error: 'text-error',
    warning: 'text-warning',
    info: 'text-info',
  }

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return [base, variants[props.variant], sizes[props.size]].join(' ')
})
</script>
