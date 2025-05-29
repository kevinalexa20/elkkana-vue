<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { profileService } from '@/services/profileService'
import { fileService } from '@/services/fileService'
import type { ProfileFormData, DocumentType } from '@/types/profile'

// IMPORT MISSING COMPONENTS & CONFIG
import DocumentUpload from '@/components/DocumentUpload.vue'
import { documentCategories } from '@/config/documentConfig'

// Composables
const { user, isAuthenticated } = useAuth()

// Form data
const formData = ref<ProfileFormData>({
  fullName: '',
  placeOfBirth: '',
  dateOfBirth: '',
  consentGiven: false,
})

// File upload state
const uploadedFiles = ref<Record<string, string | string[]>>({}) // UPDATED: Support arrays for multiple files
const uploadingFiles = ref<Record<string, boolean>>({})
const fileErrors = ref<Record<string, string>>({})

// State
const isLoading = ref(false)
const isSaving = ref(false)
const userProfile = ref<any>(null)
const saveError = ref<string | null>(null)

// Computed
const canSubmit = computed(() => {
  return (
    formData.value.fullName &&
    formData.value.consentGiven &&
    uploadedFiles.value.cv &&
    uploadedFiles.value.photo &&
    !Object.values(uploadingFiles.value).some((uploading) => uploading)
  )
})

const isUploading = computed(() => {
  return Object.values(uploadingFiles.value).some((uploading) => uploading)
})

const handleUploadComplete = (documentType: DocumentType) => {
  uploadingFiles.value[documentType] = false
  console.log(`🏁 Upload completed and state cleared for ${documentType}`)
}

// Load existing profile
const loadProfile = async () => {
  if (!user.value?.$id) return

  isLoading.value = true
  try {
    const profile = await profileService.getProfile(user.value.$id)
    if (profile) {
      userProfile.value = profile
      formData.value = {
        fullName: profile.fullName || '',
        placeOfBirth: profile.placeOfBirth || '',
        dateOfBirth: profile.dateOfBirth || '',
        consentGiven: profile.consentGiven || false,
      }

      // Load existing file IDs - UPDATED: Support all document types
      uploadedFiles.value = {
        cv: profile.cvFileId || '',
        photo: profile.photoFileId || '',
        passport: profile.passportFileId || '',
        visa: profile.visaFileId || '',
        ktp: profile.ktpFileId || '',
        seamanBook: profile.seamanBookFileId || '',
        bstCertificate: profile.bstCertificateFileId || '',
        satCertificate: profile.satCertificateFileId || '',
        mcuCertificate: profile.mcuCertificateFileId || '',
        lastEducationDiploma: profile.lastEducationDiplomaFileId || '',
        skck: profile.skckFileId || '',
        npwp: profile.npwpFileId || '',
        // Arrays for multiple files
        skillCertificate: profile.skillCertificateIds || [],
        seaServiceRecord: profile.seaServiceRecordFileIds || [],
        otherSupportingDocument: profile.otherSupportingDocumentIds || [],
      }
    }
  } catch (error) {
    console.error('Failed to load profile:', error)
  } finally {
    isLoading.value = false
  }
}

// ADDED: Get uploaded files for specific document type
const getUploadedFilesForType = (documentType: DocumentType) => {
  return (
    uploadedFiles.value[documentType] ||
    // Check if it's a multiple file type
    (['skillCertificate', 'seaServiceRecord', 'otherSupportingDocument'].includes(documentType)
      ? []
      : '')
  )
}

// ADDED: Handle file uploaded from DocumentUpload component
const handleFileUploaded = (fileId: string, documentType: DocumentType) => {
  // Handle multiple file types
  const multipleFileTypes = ['skillCertificate', 'seaServiceRecord', 'otherSupportingDocument']

  if (multipleFileTypes.includes(documentType)) {
    // Add to array
    const currentFiles = (uploadedFiles.value[documentType] as string[]) || []
    uploadedFiles.value[documentType] = [...currentFiles, fileId]
  } else {
    // Single file
    uploadedFiles.value[documentType] = fileId
  }

  console.log(`✅ ${documentType} uploaded successfully:`, fileId)
}

// ADDED: Handle file removed from DocumentUpload component
const handleFileRemoved = (fileId: string, documentType: DocumentType) => {
  const multipleFileTypes = ['skillCertificate', 'seaServiceRecord', 'otherSupportingDocument']

  if (multipleFileTypes.includes(documentType)) {
    // Remove from array
    const currentFiles = (uploadedFiles.value[documentType] as string[]) || []
    uploadedFiles.value[documentType] = currentFiles.filter((id) => id !== fileId)
  } else {
    // Remove single file
    delete uploadedFiles.value[documentType]
  }

  console.log(`✅ ${documentType} file removed:`, fileId)
}

// ADDED: Handle upload start
const handleUploadStart = (documentType: DocumentType) => {
  uploadingFiles.value[documentType] = true
}

// ADDED: Handle upload error
const handleUploadError = (error: string, documentType: DocumentType) => {
  fileErrors.value[documentType] = error
  uploadingFiles.value[documentType] = false
}

// UPDATED: Save profile with all document types
const saveProfile = async (isDraft = false) => {
  if (!user.value?.$id) return

  isSaving.value = true
  saveError.value = null

  try {
    const profileData = {
      fullName: formData.value.fullName,
      placeOfBirth: formData.value.placeOfBirth,
      dateOfBirth: formData.value.dateOfBirth,
      consentGiven: isDraft ? false : formData.value.consentGiven,

      // Single file IDs
      cvFileId: (uploadedFiles.value.cv as string) || '',
      photoFileId: (uploadedFiles.value.photo as string) || '',
      passportFileId: (uploadedFiles.value.passport as string) || '',
      visaFileId: (uploadedFiles.value.visa as string) || '',
      ktpFileId: (uploadedFiles.value.ktp as string) || '',
      seamanBookFileId: (uploadedFiles.value.seamanBook as string) || '',
      bstCertificateFileId: (uploadedFiles.value.bstCertificate as string) || '',
      satCertificateFileId: (uploadedFiles.value.satCertificate as string) || '',
      mcuCertificateFileId: (uploadedFiles.value.mcuCertificate as string) || '',
      lastEducationDiplomaFileId: (uploadedFiles.value.lastEducationDiploma as string) || '',
      skckFileId: (uploadedFiles.value.skck as string) || '',
      npwpFileId: (uploadedFiles.value.npwp as string) || '',

      // Multiple file IDs (arrays)
      skillCertificateIds: (uploadedFiles.value.skillCertificate as string[]) || [],
      seaServiceRecordFileIds: (uploadedFiles.value.seaServiceRecord as string[]) || [],
      otherSupportingDocumentIds: (uploadedFiles.value.otherSupportingDocument as string[]) || [],

      applicationStatus: isDraft ? 'draft' : 'pending',
    }

    if (userProfile.value) {
      await profileService.updateProfile(userProfile.value.$id, profileData)
      console.log('✅ Profile updated successfully')
    } else {
      console.warn('⚠️ No existing profile found, this should not happen')
      return
    }

    await loadProfile()

    if (isDraft) {
      console.log('✅ Profile saved as draft')
    } else {
      console.log('✅ Profile submitted successfully')
    }
  } catch (error: any) {
    console.error('❌ Failed to save profile:', error)
    saveError.value = error.message || 'Failed to save profile'
  } finally {
    isSaving.value = false
  }
}

// LEGACY: Keep old methods for backward compatibility (remove later)
const getFilePreview = (documentType: DocumentType) => {
  const fileId = uploadedFiles.value[documentType] as string
  if (!fileId) return ''
  return fileService.getFilePreview(fileId)
}

const hasFile = (documentType: DocumentType) => {
  const files = uploadedFiles.value[documentType]
  if (Array.isArray(files)) {
    return files.length > 0
  }
  return !!files
}

onMounted(() => {
  if (isAuthenticated.value) {
    loadProfile()
  }
})
</script>

<template>
  <div class="min-h-screen bg-base-200 p-4">
    <div class="container mx-auto max-w-4xl">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Edit Profile</h1>
        <p class="text-base-content/70">Complete your profile to apply for crew positions</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center min-h-[400px]">
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <!-- Error Alert -->
      <div v-if="saveError" class="alert alert-error mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ saveError }}</span>
        <div>
          <button @click="saveError = null" class="btn btn-sm">Dismiss</button>
        </div>
      </div>

      <!-- Profile Form -->
      <div v-else class="space-y-6">
        <!-- Personal Information Card -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title mb-4">Personal Information</h2>

            <!-- Full Name -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Full Name *</span>
              </label>
              <input
                type="text"
                v-model="formData.fullName"
                placeholder="Enter your full name"
                class="input input-bordered w-full"
                required
              />
            </div>

            <!-- Place of Birth -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Place of Birth</span>
              </label>
              <input
                type="text"
                v-model="formData.placeOfBirth"
                placeholder="Enter your place of birth"
                class="input input-bordered w-full"
              />
            </div>

            <!-- Date of Birth -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Date of Birth</span>
              </label>
              <input
                type="date"
                v-model="formData.dateOfBirth"
                class="input input-bordered w-full"
              />
            </div>
          </div>
        </div>

        <!-- Document Upload Cards -->
        <div
          v-for="category in documentCategories"
          :key="category.title"
          class="card bg-base-100 shadow-xl"
        >
          <div class="card-body">
            <h2 class="card-title mb-2">{{ category.title }}</h2>
            <p class="text-sm text-base-content/70 mb-4">{{ category.description }}</p>

            <!-- Document uploads for this category -->
            <DocumentUpload
              v-for="doc in category.documents"
              :key="doc.type"
              :document-type="doc.type"
              :label="doc.label"
              :required="doc.required"
              :accepted-formats="doc.acceptedFormats"
              :multiple="doc.multiple"
              :uploaded-files="getUploadedFilesForType(doc.type)"
              :is-uploading="uploadingFiles[doc.type]"
              :error="fileErrors[doc.type]"
              :user-id="user?.$id || ''"
              @file-uploaded="handleFileUploaded"
              @file-removed="handleFileRemoved"
              @upload-start="handleUploadStart"
              @upload-error="handleUploadError"
              @upload-complete="handleUploadComplete"
            />
          </div>
        </div>

        <!-- Consent Agreement -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title mb-4">Agreement & Consent</h2>

            <div class="form-control">
              <label class="label cursor-pointer justify-start">
                <input
                  type="checkbox"
                  v-model="formData.consentGiven"
                  class="checkbox checkbox-primary mr-4"
                />
                <span class="label-text">
                  I agree to be included in Elkkana Corp's waiting list and consent to be
                  recommended to partner companies
                </span>
              </label>
            </div>

            <div class="alert alert-info mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span class="text-sm">
                By checking this box, you consent to have your profile shared with Elkkana Corp's
                partner shipping companies for crew placement opportunities.
              </span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="card-actions justify-end">
              <button
                @click="saveProfile(true)"
                class="btn btn-outline"
                :disabled="isSaving || isUploading"
              >
                Save Draft
              </button>
              <button
                @click="saveProfile(false)"
                class="btn btn-primary"
                :class="{ loading: isSaving }"
                :disabled="!canSubmit || isSaving || isUploading"
              >
                <span v-if="!isSaving">Submit Profile</span>
                <span v-else>Saving...</span>
              </button>
            </div>

            <!-- Submit Requirements -->
            <div class="mt-4">
              <p class="text-sm text-base-content/70 mb-2">Required for submission:</p>
              <div class="flex flex-wrap gap-2">
                <div class="badge" :class="formData.fullName ? 'badge-success' : 'badge-warning'">
                  Full Name
                </div>
                <div class="badge" :class="hasFile('cv') ? 'badge-success' : 'badge-warning'">
                  CV
                </div>
                <div class="badge" :class="hasFile('photo') ? 'badge-success' : 'badge-warning'">
                  Photo
                </div>
                <div
                  class="badge"
                  :class="formData.consentGiven ? 'badge-success' : 'badge-warning'"
                >
                  Consent
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
