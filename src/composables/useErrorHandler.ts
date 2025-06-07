import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ENV, isDev, isProd } from '@/config/env'
import type { AppError } from '@/types/errors'
// 🔑 SINGLETON STATE - Pindahkan ke luar function

const globalError = ref<string | null>(null)
const globalCurrentError = ref<AppError | null>(null)
const globalErrorHistory = ref<AppError[]>([])

// Debug access
if (typeof window !== 'undefined') {
  window.debugErrorState = {
    error: globalError,
    currentError: globalCurrentError,
    history: globalErrorHistory,
  }
}

export const useErrorHandler = () => {
  const router = useRouter()
  // const error = ref<string | null>(null)
  // const currentError = ref<AppError | null>(null)
  // const errorHistory = ref<AppError[]>([])

  const handleError = (err: unknown) => {
    const appError = processError(err)

    // Always show user-friendly message
    globalError.value = appError.message
    globalCurrentError.value = appError
    globalErrorHistory.value.push(appError)

    // Development-only detailed logging
    if (ENV.features.enableDetailedLogging) {
      console.group('🐛 Error Details')
      console.error('Original error:', err)
      console.log('Processed error:', appError)
      console.log('Stack trace:', appError.stack)
      console.log('User agent:', navigator.userAgent)
      console.log('Current URL:', window.location.href)
      console.log('Timestamp:', new Date().toISOString())
      console.groupEnd()
    }

    // Production-only error tracking
    if (ENV.features.enableErrorTracking) {
      // Send to monitoring service (Sentry or LogRocket)
      sendToErrorTracking(appError)
    }

    // Handle critical errors (auth failures)
    if (appError.type === 'auth') {
      localStorage.clear()
      router.push('/login')
      return
    }
  }

  const processError = (err: unknown): AppError => {
    // Type-safe error processing
    let message = 'Something went wrong'
    let code: string | number | undefined
    let type: AppError['type'] = 'client'
    let stack: string | undefined

    if (err instanceof Error) {
      message = err.message
      stack = err.stack
      // Check for specific error types
      if ('code' in err) {
        code = (err as any).code
        type = getErrorType((err as any).code)
      }
    } else if (typeof err === 'string') {
      message = err
    } else if (err && typeof err === 'object' && 'message' in err) {
      message = (err as any).message
      code = (err as any).code
      type = getErrorType(code)
    }

    return {
      message,
      code,
      type,
      stack,
      timestamp: new Date(),
      severity: getSeverity(type),
    }
  }

  const getErrorType = (code: any): AppError['type'] => {
    if (code === 401 || code === 'user_invalid_credentials') return 'auth'
    if (code === 'user_already_exists') return 'validation'
    if (typeof code === 'number' && code >= 500) return 'server'
    if (typeof code === 'number' && code >= 400) return 'client'
    return 'client'
  }

  const getSeverity = (type: AppError['type']): AppError['severity'] => {
    switch (type) {
      case 'auth':
        return 'error'
      case 'server':
        return 'error'
      case 'network':
        return 'warning'
      case 'validation':
        return 'warning'
      default:
        return 'error'
    }
  }

  const sendToErrorTracking = (error: AppError) => {
    // Future sentry implementation here.
    console.log('📡 Sending error to tracking service:', error)
  }

  const clearError = () => {
    globalError.value = null
    globalCurrentError.value = null
  }

  return {
    error: globalError,
    currentError: globalCurrentError,
    handleError,
    clearError,
    getErrorHistory: () => globalErrorHistory.value,
  }
}

// Export helper for testing
export const createTestError = (message: string, type: AppError['type'] = 'client') => {
  const { handleError } = useErrorHandler()
  const testError = new Error(message)
  ;(testError as any).type = type
  handleError(testError)
}
