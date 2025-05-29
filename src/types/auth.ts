export interface User {
  $id: string
  name: string
  email: string
  emailVerification: boolean
  $createdAt: string
  $updatedAt: string
}

export interface BasicProfile {
  userId: string
  fullName: string
  profileLastUpdatedAt?: string
  // Field lain bisa kosong dulu
  placeOfBirth?: string
  dateOfBirth?: string
  consentGiven: boolean // Default false untuk register
}

export interface AuthError {
  code?: number
  message: string
  type?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: AuthError | null
}
