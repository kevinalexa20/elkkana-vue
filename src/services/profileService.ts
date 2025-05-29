import { databases, config, ID } from '@/utils/appwrite'
import { Query } from 'appwrite'

export interface BasicProfile {
  userId: string
  fullName: string
  placeOfBirth?: string
  dateOfBirth?: string
  consentGiven: boolean
  // Document flags
  cvFileId?: string
  photoFileId?: string
  passportFileId?: string
  seamanBookFileId?: string
  // Timestamps
  profileLastUpdatedAt?: string
}

export class ProfileService {
  /**
   * Create basic profile for new user
   */
  async createBasicProfile(userId: string, fullName: string): Promise<any> {
    try {
      const profileData: BasicProfile = {
        userId,
        fullName,
        placeOfBirth: '',
        dateOfBirth: '',
        consentGiven: false,
        cvFileId: '',
        photoFileId: '',
        passportFileId: '',
        seamanBookFileId: '',
        profileLastUpdatedAt: new Date().toISOString(),
      }

      const profile = await databases.createDocument(
        config.databaseId,
        config.profilesCollectionId,
        ID.unique(),
        profileData,
      )

      console.log('✅ Profile created:', profile)
      return profile
    } catch (error: any) {
      console.error('❌ Failed to create profile:', error)
      throw {
        code: error.code,
        message: error.message || 'Failed to create profile',
        type: error.type,
      }
    }
  }

  /**
   * Get user profile by userId
   */
  async getProfile(userId: string): Promise<any> {
    try {
      console.log('🔍 Searching profile for userId:', userId)

      const response = await databases.listDocuments(
        config.databaseId,
        config.profilesCollectionId,
        [Query.equal('userId', userId)], // FIXED: Proper query syntax
      )

      if (response.documents.length > 0) {
        console.log('✅ Profile found:', response.documents[0])
        return response.documents[0]
      } else {
        console.log('ℹ️ No profile found for user:', userId)
        return null
      }
    } catch (error: any) {
      console.error('❌ Failed to get profile:', error)
      return null
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(documentId: string, profileData: Partial<BasicProfile>): Promise<any> {
    try {
      // Add timestamp to update
      const updateData = {
        ...profileData,
        profileLastUpdatedAt: new Date().toISOString(),
      }

      const profile = await databases.updateDocument(
        config.databaseId,
        config.profilesCollectionId,
        documentId,
        updateData,
      )

      console.log('✅ Profile updated:', profile)
      return profile
    } catch (error: any) {
      console.error('❌ Failed to update profile:', error)
      throw {
        code: error.code,
        message: error.message || 'Failed to update profile',
        type: error.type,
      }
    }
  }

  /**
   * Check if user has profile
   */
  async hasProfile(userId: string): Promise<boolean> {
    try {
      const profile = await this.getProfile(userId)
      return !!profile
    } catch (error) {
      return false
    }
  }
}

// Export singleton instance
export const profileService = new ProfileService()
