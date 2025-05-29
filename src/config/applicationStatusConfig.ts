import type { ApplicationStatus, ApplicationStatusInfo } from '@/types/application'

export const statusConfig: Record<
  ApplicationStatus,
  Omit<ApplicationStatusInfo, 'status' | 'isCompleted'>
> = {
  draft: {
    label: 'Draft',
    description: 'Profile belum disubmit',
    color: 'text-base-content/50',
    icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
  },
  pending: {
    label: 'Submitted',
    description: 'Profile telah disubmit dan menunggu review',
    color: 'text-warning',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  under_review: {
    label: 'Under Review',
    description: 'Tim Elkkana sedang meninjau profile Anda',
    color: 'text-info',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  interview: {
    label: 'Interview Stage',
    description: 'Anda dipanggil untuk tahap interview',
    color: 'text-primary',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
  waiting_list: {
    label: 'Waiting List',
    description: 'Anda telah masuk dalam waiting list Elkkana',
    color: 'text-secondary',
    icon: 'M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  recommended: {
    label: 'Recommended',
    description: 'Profile Anda telah direkomendasi ke perusahaan partner',
    color: 'text-accent',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H9m1.5 0H9m11.25 0H9m11.25 0a1.5 1.5 0 01-3 0M15 8.25a3 3 0 11-6 0 3 3 0 016 0z',
  },
  placed: {
    label: 'Successfully Placed',
    description: 'Selamat! Anda telah berhasil ditempatkan',
    color: 'text-success',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  rejected: {
    label: 'Not Selected',
    description: 'Maaf, Anda belum berhasil pada kesempatan ini',
    color: 'text-error',
    icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
}

// Status sequence for timeline
export const statusSequence: ApplicationStatus[] = [
  'draft',
  'pending',
  'under_review',
  'interview',
  'waiting_list',
  'recommended',
  'placed',
]
