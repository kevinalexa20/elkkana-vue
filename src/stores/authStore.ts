import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'
import type { User, AuthError, LoginCredentials, RegisterCredentials } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<AuthError | null>(null)
  const isInitialized = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const userName = computed(() => user.value?.name || '')
  const userEmail = computed(() => user.value?.email || '')

  // Actions
  const setUser = (newUser: User | null) => {
    user.value = newUser
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (newError: AuthError | null) => {
    error.value = newError
  }

  const clearError = () => {
    error.value = null
  }

  /**
   * Initialize auth state
   */
  const initialize = async () => {
    if (isInitialized.value) return

    setLoading(true)
    try {
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
    } catch (err: any) {
      console.log('Auth initialization failed:', err)
      setUser(null)
    } finally {
      setLoading(false)
      isInitialized.value = true
    }
  }

  /**
   * Register new user
   */
  const register = async (credentials: RegisterCredentials) => {
    setLoading(true)
    clearError()

    try {
      const newUser = await authService.register(credentials)
      setUser(newUser)
      return { success: true, user: newUser }
    } catch (err: any) {
      setError(err)
      return { success: false, error: err }
    } finally {
      setLoading(false)
    }
  }

  /**
   * Login user
   */
  const login = async (credentials: LoginCredentials) => {
    setLoading(true)
    clearError()

    try {
      const loggedUser = await authService.login(credentials)
      setUser(loggedUser)
      return { success: true, user: loggedUser }
    } catch (err: any) {
      setError(err)
      return { success: false, error: err }
    } finally {
      setLoading(false)
    }
  }

  /**
   * Logout user
   */
  const logout = async () => {
    setLoading(true)
    clearError()

    try {
      await authService.logout()
      setUser(null)
      return { success: true }
    } catch (err: any) {
      setError(err)
      return { success: false, error: err }
    } finally {
      setLoading(false)
    }
  }

  /**
   * Forgot password
   */
  const forgotPassword = async (email: string) => {
    setLoading(true)
    clearError()

    try {
      await authService.forgotPassword(email)
      return { success: true }
    } catch (err: any) {
      setError(err)
      return { success: false, error: err }
    } finally {
      setLoading(false)
    }
  }

  /**
   * Reset auth state
   */
  const reset = () => {
    setUser(null)
    setError(null)
    setLoading(false)
  }

  return {
    // State
    user,
    isLoading,
    error,
    isInitialized,
    // Getters
    isAuthenticated,
    userName,
    userEmail,
    // Actions
    initialize,
    register,
    login,
    logout,
    forgotPassword,
    reset,
    clearError,
  }
})
