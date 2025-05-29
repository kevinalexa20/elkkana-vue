<!-- src/views/dashboard/DashboardView.vue - UPDATED -->
<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { profileService } from '@/services/profileService'
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'

// IMPORT NEW COMPONENTS
import ApplicationTimeline from '@/components/ApplicationTimeline.vue'
import type { ApplicationStatus } from '@/types/application'

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
  consentGiven?: boolean
  applicationStatus?: ApplicationStatus
  profileLastUpdatedAt?: string
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
  applicationStatus: 'draft',
  profileLastUpdatedAt: undefined,
})

const userProfile = ref<any>(null)
const isLoadingProfile = ref(false)
const profileError = ref<string | null>(null)

// Computed properties
const profileCompleted = computed(() => {
  const requiredFields = ['fullName', 'placeOfBirth', 'dateOfBirth']
  const hasRequiredDocs = profileData.value.cvFileId && profileData.value.photoFileId

  const allFieldsFilled = requiredFields.every((field) => {
    const value = profileData.value[field as keyof ProfileData]
    return value !== null && value !== '' && value !== undefined
  })

  return allFieldsFilled && hasRequiredDocs && profileData.value.consentGiven
})

// UPDATED: Application status based on profile data
const currentApplicationStatus = computed((): ApplicationStatus => {
  if (!profileCompleted.value) return 'draft'

  // Return actual status from database if exists
  if (profileData.value.applicationStatus && profileData.value.applicationStatus !== 'draft') {
    return profileData.value.applicationStatus
  }

  // If profile is completed but no specific status, set as pending
  return 'pending'
})

const completionPercentage = computed(() => {
  let completed = 0
  let total = 7 // Total required items

  // Required fields (4 items)
  if (profileData.value.fullName) completed++
  if (profileData.value.placeOfBirth) completed++
  if (profileData.value.dateOfBirth) completed++
  if (profileData.value.consentGiven) completed++

  // Required documents (2 items)
  if (profileData.value.cvFileId) completed++
  if (profileData.value.photoFileId) completed++

  // Additional documents (1 item for having any additional docs)
  if (profileData.value.passportFileId || profileData.value.seamanBookFileId) completed++

  return Math.round((completed / total) * 100)
})

// Load profile dari database
const loadUserProfile = async () => {
  if (!user.value?.$id) return

  isLoadingProfile.value = true
  profileError.value = null

  try {
    const profile = await profileService.getProfile(user.value.$id)
    userProfile.value = profile

    if (profile) {
      // Update profileData dengan data dari database
      profileData.value = {
        fullName: profile.fullName || '',
        placeOfBirth: profile.placeOfBirth || '',
        dateOfBirth: profile.dateOfBirth || '',
        cvFileId: profile.cvFileId || '',
        photoFileId: profile.photoFileId || '',
        passportFileId: profile.passportFileId || '',
        seamanBookFileId: profile.seamanBookFileId || '',
        consentGiven: profile.consentGiven || false,
        applicationStatus: profile.applicationStatus || 'draft',
        profileLastUpdatedAt: profile.profileLastUpdatedAt || profile.$updatedAt,
      }

      console.log('📊 Profile loaded:', profile)
      console.log('📈 Current application status:', currentApplicationStatus.value)
    }
  } catch (error: any) {
    console.error('Failed to load profile:', error)
    profileError.value = error.message || 'Failed to load profile'
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
    }
  }
}

// ADDED: Refresh profile data
const refreshProfile = async () => {
  await loadUserProfile()
}

onMounted(() => {
  if (isAuthenticated.value) {
    loadUserProfile()
  }
})
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
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-3xl font-bold mb-2">Dashboard</h1>
              <p class="text-base-content/70">
                Selamat datang, {{ profileData.fullName || user?.name || 'User' }}
              </p>
            </div>

            <button
              @click="refreshProfile"
              class="btn btn-ghost btn-sm"
              :class="{ loading: isLoadingProfile }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        <!-- Profile Completion Card -->
        <div class="card bg-base-100 shadow-xl mb-6">
          <div class="card-body">
            <div class="flex justify-between items-start mb-4">
              <h2 class="card-title">Kelengkapan Profil</h2>
              <div
                class="badge badge-lg"
                :class="profileCompleted ? 'badge-success' : 'badge-warning'"
              >
                {{ completionPercentage }}%
              </div>
            </div>

            <div class="mb-4">
              <div class="flex justify-between text-sm mb-1">
                <span>Progress Kelengkapan</span>
                <span>{{ completionPercentage }}%</span>
              </div>
              <progress
                class="progress progress-primary w-full"
                :value="completionPercentage"
                max="100"
              ></progress>
            </div>

            <div v-if="!profileCompleted" class="alert alert-warning">
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
              <span>Lengkapi profil Anda untuk dapat melamar posisi kru kapal</span>
              <div>
                <RouterLink to="/profile/edit" class="btn btn-sm btn-primary">
                  Lengkapi Sekarang
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Application Timeline - NEW: Replace old status timeline -->
        <ApplicationTimeline
          :current-status="currentApplicationStatus"
          :last-updated="profileData.profileLastUpdatedAt"
        />

        <!-- Profile Summary -->
        <div class="card bg-base-100 shadow-xl mb-6">
          <div class="card-body">
            <h2 class="card-title">Ringkasan Profil</h2>

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
                <p class="font-medium">
                  {{
                    profileData.dateOfBirth
                      ? new Date(profileData.dateOfBirth).toLocaleDateString('id-ID')
                      : 'Belum diisi'
                  }}
                </p>
              </div>
            </div>

            <!-- Document Status -->
            <div class="divider">Status Dokumen</div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div
                class="flex items-center gap-2 p-2 rounded-lg"
                :class="profileData.cvFileId ? 'bg-success/10' : 'bg-warning/10'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  :class="profileData.cvFileId ? 'text-success' : 'text-warning'"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-if="profileData.cvFileId"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="text-sm font-medium">CV</span>
              </div>

              <div
                class="flex items-center gap-2 p-2 rounded-lg"
                :class="profileData.photoFileId ? 'bg-success/10' : 'bg-warning/10'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  :class="profileData.photoFileId ? 'text-success' : 'text-warning'"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-if="profileData.photoFileId"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="text-sm font-medium">Foto</span>
              </div>

              <div
                class="flex items-center gap-2 p-2 rounded-lg"
                :class="profileData.passportFileId ? 'bg-success/10' : 'bg-base-200'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  :class="profileData.passportFileId ? 'text-success' : 'text-base-content/50'"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-if="profileData.passportFileId"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="text-sm font-medium">Passport</span>
              </div>

              <div
                class="flex items-center gap-2 p-2 rounded-lg"
                :class="profileData.seamanBookFileId ? 'bg-success/10' : 'bg-base-200'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  :class="profileData.seamanBookFileId ? 'text-success' : 'text-base-content/50'"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-if="profileData.seamanBookFileId"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="text-sm font-medium">Seaman Book</span>
              </div>
            </div>

            <div class="card-actions justify-end mt-4">
              <RouterLink to="/profile/edit" class="btn btn-primary">
                {{ profileCompleted ? 'Edit Profil' : 'Lengkapi Profil' }}
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Aksi Cepat</h2>
            <div class="flex flex-wrap gap-2">
              <RouterLink to="/profile/edit" class="btn btn-outline btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Edit Profil
              </RouterLink>

              <button @click="refreshProfile" class="btn btn-outline btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh Status
              </button>

              <button class="btn btn-outline btn-sm" disabled>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Hubungi Support
              </button>

              <button
                @click="handleLogout"
                class="btn btn-outline btn-sm btn-error"
                :class="{ loading: isLoading }"
                :disabled="isLoading"
              >
                <svg
                  v-if="!isLoading"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
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
