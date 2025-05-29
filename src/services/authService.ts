import { account, ID } from '@/utils/appwrite'
import type { LoginCredentials, RegisterCredentials, User } from '@/types/auth'
import { profileService } from './profileService'

export class AuthService {
  /**
   * Register new user
   */
  async register(credentials: RegisterCredentials): Promise<User> {
    try {
      // Create account in appwrite auth
      console.log('Creating account with email:', credentials.email)
      await account.create(ID.unique(), credentials.email, credentials.password, credentials.name)

      // Auto login after registration
      console.log('logging in after registration')
      await account.createEmailPasswordSession(credentials.email, credentials.password)

      // Get user data
      const user = await account.get()
      console.log('User registered and logged in:', user.email)

      // create basic profile in database
      try {
        console.log('📄 Creating user profile...')
        await profileService.createBasicProfile(user.$id, credentials.name)
        console.log('✅ Basic profile created successfully')
      } catch (profileError) {
        console.error('⚠️ Failed to create profile, but auth succeeded:', profileError)
        // Don't throw error here, auth sudah berhasil
        // Profile bisa dibuat nanti di dashboard jika gagal
      }

      return user as User
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message || 'Registration failed',
        type: error.type,
      }
    }
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      // Create session
      await account.createEmailPasswordSession(credentials.email, credentials.password)

      // Get user data
      const user = await account.get()
      return user as User
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message || 'Login failed',
        type: error.type,
      }
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await account.deleteSession('current')
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message || 'Logout failed',
        type: error.type,
      }
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const user = await account.get()
      return user as User
    } catch (error) {
      // No active session
      return null
    }
  }

  /**
   * Check if user is authenticated
   */
  async checkAuth(): Promise<boolean> {
    try {
      await account.get()
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * Send password recovery email
   */
  async forgotPassword(email: string): Promise<void> {
    try {
      await account.createRecovery(email, `${window.location.origin}/reset-password`)
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message || 'Failed to send recovery email',
        type: error.type,
      }
    }
  }
}

// Export singleton instance
export const authService = new AuthService()
