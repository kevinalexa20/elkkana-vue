<script setup lang="ts">
import { ref, computed } from 'vue'
import { fileService } from '@/services/fileService'
import type { DocumentType } from '@/types/profile'

interface Props {
  documentType: DocumentType
  label: string
  required?: boolean
  acceptedFormats: string[]
  multiple?: boolean
  uploadedFiles: string | string[]
  isUploading?: boolean
  error?: string
  userId: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  multiple: false,
  isUploading: false,
})

const emit = defineEmits<{
  'file-uploaded': [fileId: string, documentType: DocumentType]
  'file-removed': [fileId: string, documentType: DocumentType]
  'upload-start': [documentType: DocumentType]
  'upload-error': [error: string, documentType: DocumentType]
  'upload-complete': [documentType: DocumentType] // ADD THIS
}>()

const isUploading = ref(false)

// Computed
const isCurrentlyUploading = computed(() => {
  return isUploading.value || props.isUploading
})

const hasFiles = computed(() => {
  if (props.multiple) {
    return Array.isArray(props.uploadedFiles) && props.uploadedFiles.length > 0
  }
  return !!props.uploadedFiles
})

const acceptString = computed(() => {
  return props.acceptedFormats.join(',')
})

const formatsList = computed(() => {
  return props.acceptedFormats.join(', ').toUpperCase()
})

// Methods
const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])

  if (files.length === 0) return

  // For single file upload, take only the first file
  const filesToUpload = props.multiple ? files : [files[0]]

  for (const file of filesToUpload) {
    await uploadSingleFile(file)
  }

  // Clear input
  target.value = ''
}

const uploadSingleFile = async (file: File) => {
  // Validate file size (5MB max)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    emit('upload-error', 'File size must be less than 5MB', props.documentType)
    return
  }

  isUploading.value = true
  emit('upload-start', props.documentType)

  try {
    console.log(`📁 Starting upload for ${props.documentType}:`, file.name)
    const fileId = await fileService.uploadFile(file, props.userId, props.documentType)

    console.log(`✅ Upload completed for ${props.documentType}:`, fileId)
    emit('file-uploaded', fileId, props.documentType)

    // ADDED: Emit upload complete to clear parent loading state
    emit('upload-complete', props.documentType)
  } catch (error: any) {
    console.error(`❌ Upload failed for ${props.documentType}:`, error)
    emit('upload-error', error.message || 'Upload failed', props.documentType)
  } finally {
    isUploading.value = false
    console.log(`🏁 Upload process finished for ${props.documentType}`)
  }
}

const removeFile = async (fileId: string) => {
  try {
    await fileService.deleteFile(fileId)
    emit('file-removed', fileId, props.documentType)
  } catch (error) {
    console.error('Failed to remove file:', error)
  }
}

const getFilePreview = (fileId: string) => {
  return fileService.getFilePreview(fileId)
}

const getUploadedFilesList = computed(() => {
  if (!hasFiles.value) return []

  if (props.multiple && Array.isArray(props.uploadedFiles)) {
    return props.uploadedFiles
  } else if (!props.multiple && typeof props.uploadedFiles === 'string') {
    return [props.uploadedFiles]
  }

  return []
})
</script>

<template>
  <div class="form-control w-full mb-4">
    <label class="label">
      <span class="label-text">
        {{ label }}
        <span v-if="required" class="text-error">*</span>
      </span>
    </label>

    <!-- File Input -->
    <div v-if="!hasFiles || multiple" class="space-y-2">
      <input
        type="file"
        :accept="acceptString"
        :multiple="multiple"
        @change="handleFileUpload"
        class="file-input file-input-bordered w-full"
        :disabled="isUploading || props.isUploading"
      />
      <div class="label">
        <span class="label-text-alt">
          {{ formatsList }} format only (Max 5MB{{ multiple ? ' each' : '' }})
        </span>
      </div>
    </div>

    <!-- Uploaded Files Display -->
    <div v-if="hasFiles" class="space-y-2">
      <div
        v-for="fileId in getUploadedFilesList"
        :key="fileId"
        class="flex items-center justify-between p-3 bg-base-200 rounded-lg"
      >
        <div class="flex items-center gap-3">
          <!-- Preview for images -->
          <div v-if="['photo'].includes(documentType)" class="avatar">
            <div class="w-12 h-12 rounded">
              <img :src="getFilePreview(fileId)" :alt="`${label} preview`" />
            </div>
          </div>

          <!-- Success icon for non-images -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <span class="text-sm font-medium">{{ label }} uploaded successfully</span>
        </div>

        <button @click="removeFile(fileId)" class="btn btn-ghost btn-sm text-error">Remove</button>
      </div>

      <!-- Add More button for multiple files -->
      <div v-if="multiple" class="text-center">
        <label class="btn btn-outline btn-sm">
          Add More Files
          <input
            type="file"
            :accept="acceptString"
            multiple
            @change="handleFileUpload"
            class="hidden"
            :disabled="isUploading || props.isUploading"
          />
        </label>
      </div>
    </div>

    <!-- Upload Progress -->
    <div v-if="isUploading || props.isUploading" class="flex items-center gap-2 mt-2">
      <span class="loading loading-spinner loading-sm"></span>
      <span class="text-sm">Uploading {{ label.toLowerCase() }}...</span>
    </div>

    <!-- Error Display -->
    <div v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </div>
  </div>
</template>
