import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useErrorHandler = () => {
  const router = useRouter()
  const error = ref<string | null>(null)

  const handleError = (err: any) => {
    // Auth errors
    if (err.code === 401 || err.code === 'UNAUTHORIZED') {
      router.push('/login')
      return
    }

    // Network errors
    if (err.message?.includes('fetch') || err.code === 'NetworkError') {
      error.value = 'Connection problem. Please check your internet.'
      return
    }

    // File upload errors
    if (err.message?.includes('file') || err.message?.includes('upload')) {
      error.value = 'File upload failed. Please try again.'
      return
    }

    // Generic error
    error.value = err.message || 'Something went wrong. Please try again.'

    console.error('Error:', err)
  }

  const clearError = () => {
    error.value = null
  }

  return {
    error,
    handleError,
    clearError,
  }
}
