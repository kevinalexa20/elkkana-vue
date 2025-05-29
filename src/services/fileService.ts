
import { storage, config, ID } from '@/utils/appwrite'
import type { DocumentType } from '@/types/profile'

export class FileService {
  /**
   * Upload file to Appwrite Storage
   */
  async uploadFile(file: File, userId: string, documentType: DocumentType): Promise<string> {
    try {
      const timestamp = new Date().getTime()
      const fileName = `${userId}_${documentType}_${timestamp}_${file.name}`
      
      console.log(`📁 Uploading ${documentType} file:`, fileName)
      
      const uploadedFile = await storage.createFile(
        config.userDocumentsBucketId, // Make sure this exists in config
        ID.unique(),
        file
      )
      
      console.log('✅ File uploaded successfully:', uploadedFile.$id)
      return uploadedFile.$id
    } catch (error: any) {
      console.error(`❌ Failed to upload ${documentType} file:`, error)
      throw {
        code: error.code,
        message: error.message || `Failed to upload ${documentType} file`,
        type: error.type
      }
    }
  }

  /**
   * Delete file from Appwrite Storage
   */
  async deleteFile(fileId: string): Promise<void> {
    try {
      await storage.deleteFile(config.userDocumentsBucketId, fileId)
      console.log('✅ File deleted successfully:', fileId)
    } catch (error: any) {
      console.error('❌ Failed to delete file:', error)
      throw {
        code: error.code,
        message: error.message || 'Failed to delete file',
        type: error.type
      }
    }
  }

  /**
   * Get file preview URL
   */
  getFilePreview(fileId: string, width = 300, height = 300): string {
    try {
      const url = storage.getFilePreview(
        config.userDocumentsBucketId,
        fileId,
        width,
        height
      )
      return url.toString()
    } catch (error) {
      console.error('❌ Failed to get file preview:', error)
      return ''
    }
  }

  /**
   * Get file download URL
   */
  getFileDownload(fileId: string): string {
    try {
      const url = storage.getFileDownload(config.userDocumentsBucketId, fileId)
      return url.toString()
    } catch (error) {
      console.error('❌ Failed to get file download URL:', error)
      return ''
    }
  }

  /**
   * Get file info
   */
  async getFileInfo(fileId: string): Promise<any> {
    try {
      const file = await storage.getFile(config.userDocumentsBucketId, fileId)
      return file
    } catch (error: any) {
      console.error('❌ Failed to get file info:', error)
      throw error
    }
  }
}

export const fileService = new FileService()