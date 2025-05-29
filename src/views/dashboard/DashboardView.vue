<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { profileService } from '@/services/profileService'
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'

// Define interfaces for type safety
interface User {
  fullName: string
  email: string
  profileCompleted: boolean
  applicationStatus: string
}

interface ProfileData {
  fullName: string
  placeOfBirth: string
  dateOfBirth: string | null
  cvFileId: string
  photoFileId: string
  passportFileId: string
  seamanBookFileId: string
  consentGiven?: boolean // Optional field for consent
}

// Composables
const { user, isAuthenticated, logout, isLoading } = useAuth()

// Profile data from database
const profileData = ref<ProfileData>({
  fullName: '',
  placeOfBirth: '',
  dateOfBirth: '',
  cvFileId: '',
  photoFileId: '',
  passportFileId: '',
  seamanBookFileId: '',
  consentGiven: false,
})

// Mock user data - nanti replace dengan Appwrite
// const profileData = ref<ProfileData>({
//   fullName: '',
//   placeOfBirth: '',
//   dateOfBirth: null,
//   hasCV: false,
//   hasPhoto: false,
//   hasPassport: false,
//   hasSeamanBook: false,
//   consentGiven: false,
// })

const userProfile = ref<any>(null)
const isLoadingProfile = ref(false)
const profileError = ref<string | null>(null)

// const profileData = ref<ProfileData>({
//   fullName: 'John Doe',
//   placeOfBirth: '',
//   dateOfBirth: null,
//   // Dokumen status
//   hasCV: false,
//   hasPhoto: false,
//   hasPassport: false,
//   hasSeamanBook: false,
//   // ... dll sesuai blueprint
// })

// Computed properties
const profileCompleted = computed(() => {
  const requiredFields = ['fullName', 'placeOfBirth', 'dateOfBirth']
  const hasRequiredDocs = profileData.value.cvFileId && profileData.value.photoFileId

  const allFieldsFilled = requiredFields.every((field) => {
    const value = profileData.value[field as keyof ProfileData]
    return value !== null && value !== '' && value !== undefined
  })

  return allFieldsFilled && hasRequiredDocs
})

const applicationStatus = computed(() => {
  if (!profileCompleted.value) return 'pending'
  if (!profileData.value.consentGiven) return 'data_completed'
  // Check if profile has additional status from database
  if (userProfile.value?.applicationStatus) {
    return userProfile.value.applicationStatus
  }
  return 'data_verified'
})

// Load profile dari database
const loadUserProfile = async () => {
  if (!user.value?.$id) return

  isLoadingProfile.value = true
  try {
    const profile = await profileService.getProfile(user.value.$id)
    userProfile.value = profile

    if (profile) {
      // Update profileData dengan data dari database
      profileData.value = {
        fullName: profile.fullName || '',
        placeOfBirth: profile.placeOfBirth || '',
        dateOfBirth: profile.dateOfBirth || null,
        cvFileId: profile.cvFileId || false,
        photoFileId: profile.hasPhoto || false,
        passportFileId: profile.hasPassport || false,
        seamanBookFileId: profile.hasSeamanBook || false,
        consentGiven: profile.consentGiven || false,
      }
    }
  } catch (error) {
    console.error('Failed to load profile:', error)
  } finally {
    isLoadingProfile.value = false
  }
}

// Logout handler
const handleLogout = async () => {
  if (confirm('Apakah Anda yakin ingin logout?')) {
    const result = await logout()
    if (result.success) {
      console.log('Logout successful')
      // User will be automatically redirected to home by useAuth composable
    }
  }
}

onMounted(() => {
  if (isAuthenticated.value) {
    loadUserProfile()
  }
})

const getStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'Menunggu Kelengkapan Data',
    data_completed: 'Data Lengkap - Menunggu Verifikasi',
    data_verified: 'Data Terverifikasi',
    interview_scheduled: 'Interview Terjadwal',
    hired: 'Diterima',
    rejected: 'Tidak Lolos',
  }
  return statusMap[status] || 'Status Tidak Diketahui'
}

const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    pending: 'badge-warning',
    data_completed: 'badge-info',
    data_verified: 'badge-primary',
    interview_scheduled: 'badge-secondary',
    hired: 'badge-success',
    rejected: 'badge-error',
  }
  return colorMap[status] || 'badge-neutral'
}
</script>

<template>
  <div class="min-h-screen bg-base-200 p-4">
    <div class="container mx-auto max-w-4xl">
      <!-- Loading state -->
      <div v-if="isLoadingProfile" class="flex justify-center items-center min-h-[400px]">
        <div class="text-center">
          <span class="loading loading-spinner loading-lg"></span>
          <p class="mt-4 text-base-content/70">Memuat profil...</p>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="profileError" class="alert alert-error mb-6">
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
        <span>{{ profileError }}</span>
        <div>
          <button @click="loadUserProfile" class="btn btn-sm">Coba Lagi</button>
        </div>
      </div>

      <!-- Main content -->
      <div v-else>
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold mb-2">Dashboard</h1>
          <p class="text-base-content/70">
            Selamat datang, {{ profileData.fullName || user?.name || 'User' }}
          </p>
        </div>

        <!-- Rest of template sama seperti sebelumnya... -->
        <!-- Status Card -->
        <div class="card bg-base-100 shadow-xl mb-6">
          <div class="card-body">
            <h2 class="card-title">Status Lamaran</h2>
            <div class="flex items-center gap-4 mb-4">
              <div class="badge" :class="getStatusColor(applicationStatus)">
                {{ getStatusText(applicationStatus) }}
              </div>
            </div>

            <!-- Progress Timeline -->
            <div class="steps steps-vertical lg:steps-horizontal w-full">
              <div class="step" :class="{ 'step-primary': profileCompleted }">Data Lengkap</div>
              <div class="step" :class="{ 'step-primary': applicationStatus === 'data_verified' }">
                Verifikasi
              </div>
              <div
                class="step"
                :class="{ 'step-primary': applicationStatus === 'interview_scheduled' }"
              >
                Interview
              </div>
              <div class="step" :class="{ 'step-primary': applicationStatus === 'hired' }">
                Hasil
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Summary -->
        <div class="card bg-base-100 shadow-xl mb-6">
          <div class="card-body">
            <h2 class="card-title">Profil Saya</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p class="text-sm text-base-content/70">Nama Lengkap</p>
                <p class="font-medium">{{ profileData.fullName || 'Belum diisi' }}</p>
              </div>
              <div>
                <p class="text-sm text-base-content/70">Email</p>
                <p class="font-medium">{{ user?.email || 'Belum diisi' }}</p>
              </div>
              <div>
                <p class="text-sm text-base-content/70">Tempat Lahir</p>
                <p class="font-medium">{{ profileData.placeOfBirth || 'Belum diisi' }}</p>
              </div>
              <div>
                <p class="text-sm text-base-content/70">Tanggal Lahir</p>
                <p class="font-medium">{{ profileData.dateOfBirth || 'Belum diisi' }}</p>
              </div>
            </div>

            <!-- Document Checklist -->
            <div class="divider">Dokumen Wajib</div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :checked="!!profileData.cvFileId"
                  class="checkbox checkbox-sm"
                  disabled
                />
                <span class="text-sm">CV</span>
              </div>
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :checked="!!profileData.photoFileId"
                  class="checkbox checkbox-sm"
                  disabled
                />
                <span class="text-sm">Pas Foto</span>
              </div>
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :checked="!!profileData.passportFileId"
                  class="checkbox checkbox-sm"
                  disabled
                />
                <span class="text-sm">Passport</span>
              </div>
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :checked="!!profileData.seamanBookFileId"
                  class="checkbox checkbox-sm"
                  disabled
                />
                <span class="text-sm">Seaman Book</span>
              </div>
            </div>

            <div class="card-actions justify-end">
              <RouterLink to="/profile/edit" class="btn btn-primary">
                {{ profileCompleted ? 'Edit Profil' : 'Lengkapi Profil untuk Melamar' }}
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Aksi Cepat</h2>
            <div class="flex flex-wrap gap-2">
              <RouterLink to="/profile/edit" class="btn btn-outline btn-sm">Edit Profil</RouterLink>
              <button class="btn btn-outline btn-sm" disabled>Lihat Riwayat</button>
              <button class="btn btn-outline btn-sm" disabled>Hubungi Support</button>
              <button
                @click="handleLogout"
                class="btn btn-outline btn-sm btn-error"
                :class="{ loading: isLoading }"
                :disabled="isLoading"
              >
                <span v-if="!isLoading">Logout</span>
                <span v-else>Logging out...</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
