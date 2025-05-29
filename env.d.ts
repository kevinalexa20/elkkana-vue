/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPWRITE_ENDPOINT: string
  readonly VITE_APPWRITE_PROJECT_ID: string
  readonly VITE_APPWRITE_DATABASE_ID: string
  readonly VITE_APPWRITE_PROFILES_COLLECTION_ID: string
  readonly VITE_APPWRITE_STORAGE_BUCKET_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
