import { Client, Account, Databases, Storage, ID, Query } from 'appwrite'

// Validate environment variables
const requiredEnvVars = [
  'VITE_APPWRITE_ENDPOINT',
  'VITE_APPWRITE_PROJECT_ID',
  'VITE_APPWRITE_DATABASE_ID',
  'VITE_APPWRITE_PROFILES_COLLECTION_ID',
  'VITE_APPWRITE_STORAGE_BUCKET_ID',
] as const

// Validate each environment variable
const missingVars = requiredEnvVars.filter((envVar) => !import.meta.env[envVar])
if (missingVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
}

// requiredEnvVars.forEach((envVar) => {
//   if (!import.meta.env[envVar]) {
//     throw new Error(`Missing required environment variable: ${envVar}`)
//   }
// })

// Environment configuration
export const config = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  profilesCollectionId: import.meta.env.VITE_APPWRITE_PROFILES_COLLECTION_ID,
  storageBucketId: import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID,
  userDocumentsBucketId: import.meta.env.VITE_APPWRITE_USER_DOCUMENTS_BUCKET_ID,
}

// Initialize Appwrite client
export const client = new Client()

client.setEndpoint(config.endpoint).setProject(config.projectId) // Replace with your project ID

// Export Appwrite services
export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export { ID, Query }

// Log configuration in development
if (import.meta.env.DEV) {
  console.log('🚀 Appwrite Configuration:', {
    endpoint: config.endpoint,
    projectId: config.projectId,
    databaseId: config.databaseId,
  })
}
