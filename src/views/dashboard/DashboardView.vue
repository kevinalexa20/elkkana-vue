<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
  hasCV: boolean
  hasPhoto: boolean
  hasPassport: boolean
  hasSeamanBook: boolean
}

// Mock user data - nanti replace dengan Appwrite
const user = ref<User>({
  fullName: 'John Doe',
  email: 'john@example.com',
  profileCompleted: false,
  applicationStatus: 'pending', // data_completed, data_verified, interview_scheduled, etc.
})

const profileData = ref<ProfileData>({
  fullName: 'John Doe',
  placeOfBirth: '',
  dateOfBirth: null,
  // Dokumen status
  hasCV: false,
  hasPhoto: false,
  hasPassport: false,
  hasSeamanBook: false,
  // ... dll sesuai blueprint
})

onMounted(() => {
  // TODO: Load user profile data dari Appwrite
  checkProfileCompletion()
})

const checkProfileCompletion = (): void => {
  // Logic untuk cek apakah profile sudah lengkap
  const requiredFields: (keyof ProfileData)[] = ['fullName', 'placeOfBirth', 'dateOfBirth']
  const hasRequiredDocs = profileData.value.hasCV && profileData.value.hasPhoto

  const allFieldsFilled = requiredFields.every((field) => {
    const value = profileData.value[field]
    return value !== null && value !== '' && value !== undefined
  })

  user.value.profileCompleted = allFieldsFilled && hasRequiredDocs
}

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
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Dashboard</h1>
        <p class="text-base-content/70">Selamat datang, {{ user.fullName }}</p>
      </div>

      <!-- Status Card -->
      <div class="card bg-base-100 shadow-xl mb-6">
        <div class="card-body">
          <h2 class="card-title">Status Lamaran</h2>
          <div class="flex items-center gap-4 mb-4">
            <div class="badge" :class="getStatusColor(user.applicationStatus)">
              {{ getStatusText(user.applicationStatus) }}
            </div>
          </div>

          <!-- Progress Timeline -->
          <div class="steps steps-vertical lg:steps-horizontal w-full">
            <div class="step" :class="{ 'step-primary': user.profileCompleted }">Data Lengkap</div>
            <div
              class="step"
              :class="{ 'step-primary': user.applicationStatus === 'data_verified' }"
            >
              Verifikasi
            </div>
            <div
              class="step"
              :class="{ 'step-primary': user.applicationStatus === 'interview_scheduled' }"
            >
              Interview
            </div>
            <div class="step" :class="{ 'step-primary': user.applicationStatus === 'hired' }">
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
              <p class="font-medium">{{ user.email }}</p>
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
                :checked="profileData.hasCV"
                class="checkbox checkbox-sm"
                disabled
              />
              <span class="text-sm">CV</span>
            </div>
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                :checked="profileData.hasPhoto"
                class="checkbox checkbox-sm"
                disabled
              />
              <span class="text-sm">Pas Foto</span>
            </div>
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                :checked="profileData.hasPassport"
                class="checkbox checkbox-sm"
                disabled
              />
              <span class="text-sm">Passport</span>
            </div>
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                :checked="profileData.hasSeamanBook"
                class="checkbox checkbox-sm"
                disabled
              />
              <span class="text-sm">Seaman Book</span>
            </div>
          </div>

          <div class="card-actions justify-end">
            <RouterLink to="/profile/edit" class="btn btn-primary">
              {{ user.profileCompleted ? 'Edit Profil' : 'Lengkapi Profil untuk Melamar' }}
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
            <button class="btn btn-outline btn-sm">Lihat Riwayat</button>
            <button class="btn btn-outline btn-sm">Hubungi Support</button>
            <button class="btn btn-outline btn-sm btn-error">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
