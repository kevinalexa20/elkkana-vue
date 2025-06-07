<template>
  <div v-if="ENV.features.showErrorTestPanel" class="fixed bottom-4 right-4 z-50">
    <!-- Toggle button -->
    <button
      @click="showPanel = !showPanel"
      class="btn btn-circle btn-primary btn-sm mb-2"
      title="Error Testing Panel"
    >
      🧪
    </button>

    <!-- Testing panel -->
    <div v-if="showPanel" class="card bg-base-100 shadow-xl w-80 max-h-96 overflow-y-auto">
      <div class="card-body p-4">
        <h3 class="card-title text-sm">🧪 Error Testing Panel</h3>

        <!-- Quick tests -->
        <div class="space-y-2">
          <button @click="testSimpleError" class="btn btn-xs btn-error btn-block">
            Test Simple Error
          </button>
          <button @click="testAuthError" class="btn btn-xs btn-warning btn-block">
            Test Auth Error (401)
          </button>
          <button @click="testNetworkError" class="btn btn-xs btn-info btn-block">
            Test Network Error
          </button>
          <button @click="testValidationError" class="btn btn-xs btn-secondary btn-block">
            Test Validation Error
          </button>
          <button @click="testServerError" class="btn btn-xs btn-accent btn-block">
            Test Server Error (500)
          </button>
        </div>

        <!-- Clear button -->
        <div class="divider my-2"></div>
        <button @click="clearAllErrors" class="btn btn-xs btn-outline btn-block">
          Clear All Errors
        </button>

        <!-- Debug info -->
        <div class="mt-2 text-xs bg-base-200 p-2 rounded">
          <div><strong>Current State:</strong></div>
          <div>Error: {{ error || 'none' }}</div>
          <div>Type: {{ currentError?.type || 'none' }}</div>
          <div>Severity: {{ currentError?.severity || 'none' }}</div>
          <div>History: {{ getErrorHistory().length }} items</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useErrorHandler, createTestError } from '@/composables/useErrorHandler'
import { ENV } from '@/config/env'

const showPanel = ref(false)
const { error, currentError, handleError, clearError, getErrorHistory } = useErrorHandler()

const testSimpleError = () => {
  console.log('🧪 Testing simple error')
  createTestError('This is a test error message!', 'client')
}

const testAuthError = () => {
  console.log('🧪 Testing auth error')
  const authError = new Error('Unauthorized access')
  ;(authError as any).code = 401
  handleError(authError)
}

const testNetworkError = () => {
  console.log('🧪 Testing network error')
  const netError = new Error('Failed to fetch')
  ;(netError as any).name = 'NetworkError'
  handleError(netError)
}

const testValidationError = () => {
  console.log('🧪 Testing validation error')
  const valError = new Error('Email is required')
  ;(valError as any).code = 'user_already_exists'
  handleError(valError)
}

const testServerError = () => {
  console.log('🧪 Testing server error')
  const serverError = new Error('Internal server error')
  ;(serverError as any).code = 500
  handleError(serverError)
}

const clearAllErrors = () => {
  console.log('🧪 Clearing all errors')
  clearError()
}
</script>
