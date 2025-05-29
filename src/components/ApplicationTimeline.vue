<script setup lang="ts">
import { computed } from 'vue'
import type { ApplicationStatus, TimelineStep } from '@/types/application'
import { statusConfig, statusSequence } from '@/config/applicationStatusConfig'

interface Props {
  currentStatus: ApplicationStatus
  lastUpdated?: string
}

const props = defineProps<Props>()

// Generate timeline steps
const timelineSteps = computed((): TimelineStep[] => {
  const currentIndex = statusSequence.indexOf(props.currentStatus)

  return statusSequence.map((status, index) => {
    const config = statusConfig[status]

    return {
      status,
      ...config,
      isCompleted: index <= currentIndex && props.currentStatus !== 'rejected',
      isCurrent: status === props.currentStatus,
      timestamp: status === props.currentStatus ? props.lastUpdated : undefined,
    }
  })
})

const currentStatusInfo = computed(() => {
  return statusConfig[props.currentStatus]
})

const getStepClass = (step: TimelineStep) => {
  if (step.isCurrent) {
    return 'step-primary'
  } else if (step.isCompleted) {
    return 'step-success'
  } else {
    return ''
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Current Status Card -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex items-center gap-4">
          <div class="avatar placeholder">
            <div class="bg-primary text-primary-content rounded-full w-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="currentStatusInfo.icon"
                />
              </svg>
            </div>
          </div>

          <div class="flex-1">
            <h2 class="card-title" :class="currentStatusInfo.color">
              {{ currentStatusInfo.label }}
            </h2>
            <p class="text-base-content/70">{{ currentStatusInfo.description }}</p>
            <p v-if="lastUpdated" class="text-sm text-base-content/50 mt-1">
              Last updated:
              {{
                new Date(lastUpdated).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              }}
            </p>
          </div>

          <div class="badge badge-lg" :class="currentStatusInfo.color.replace('text-', 'badge-')">
            Current Status
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title mb-6">Application Progress</h3>

        <ul class="steps steps-vertical lg:steps-horizontal w-full">
          <li
            v-for="(step, index) in timelineSteps"
            :key="step.status"
            class="step"
            :class="getStepClass(step)"
          >
            <div class="flex flex-col items-center text-center">
              <div class="mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  :class="step.color"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="step.icon"
                  />
                </svg>
              </div>

              <div
                class="text-sm font-medium"
                :class="step.isCurrent ? 'text-primary font-bold' : ''"
              >
                {{ step.label }}
              </div>

              <div class="text-xs text-base-content/60 mt-1 max-w-24">
                {{ step.description }}
              </div>

              <div v-if="step.timestamp" class="text-xs text-base-content/50 mt-1">
                {{ new Date(step.timestamp).toLocaleDateString('id-ID') }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Status-specific Information -->
    <div v-if="currentStatus === 'interview'" class="alert alert-info">
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
      <span
        >Tim kami akan segera menghubungi Anda untuk jadwal interview. Pastikan nomor telepon
        aktif.</span
      >
    </div>

    <div v-if="currentStatus === 'waiting_list'" class="alert alert-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-current shrink-0 w-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span
        >Selamat! Anda telah masuk dalam waiting list. Kami akan menghubungi jika ada lowongan yang
        sesuai.</span
      >
    </div>

    <div v-if="currentStatus === 'recommended'" class="alert alert-warning">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-current shrink-0 w-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span
        >Profile Anda telah direkomendasi ke perusahaan partner. Harap tunggu konfirmasi lebih
        lanjut.</span
      >
    </div>

    <div v-if="currentStatus === 'placed'" class="alert alert-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-current shrink-0 w-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span
        >🎉 Selamat! Anda telah berhasil ditempatkan. Tim kami akan menghubungi untuk detail
        selanjutnya.</span
      >
    </div>

    <div v-if="currentStatus === 'rejected'" class="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-current shrink-0 w-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span
        >Maaf, Anda belum berhasil pada kesempatan ini. Jangan menyerah, terus tingkatkan
        kualifikasi Anda!</span
      >
    </div>
  </div>
</template>
