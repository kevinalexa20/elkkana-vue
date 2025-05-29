import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import type { LoginCredentials, RegisterCredentials } from '@/types/auth'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  // Computed properties
  const user = computed(() => authStore.user)
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const isLoading = computed(() => authStore.isLoading)
  const error = computed(() => authStore.error)
  const userName = computed(() => authStore.userName)
  const userEmail = computed(() => authStore.userEmail)

  // Auth methods
  const login = async (credentials: LoginCredentials) => {
    const result = await authStore.login(credentials)

    if (result.success) {
      // Redirect to dashboard after successful login
      await router.push('/dashboard')
    }

    return result
  }

  const register = async (credentials: RegisterCredentials) => {
    const result = await authStore.register(credentials)

    if (result.success) {
      // Redirect to dashboard after successful registration
      await router.push('/dashboard')
    }

    return result
  }

  const logout = async () => {
    const result = await authStore.logout()

    if (result.success) {
      // Redirect to home after logout
      await router.push('/')
    }

    return result
  }

  const forgotPassword = async (email: string) => {
    return await authStore.forgotPassword(email)
  }

  const clearError = () => {
    authStore.clearError()
  }

  // Utility methods
  const redirectIfAuthenticated = () => {
    if (isAuthenticated.value) {
      router.push('/dashboard')
    }
  }

  const redirectIfNotAuthenticated = () => {
    if (!isAuthenticated.value) {
      router.push('/login')
    }
  }

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    userName,
    userEmail,
    // Methods
    login,
    register,
    logout,
    forgotPassword,
    clearError,
    // Utilities
    redirectIfAuthenticated,
    redirectIfNotAuthenticated,
  }
}
