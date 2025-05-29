export type ApplicationStatus =
  | 'draft' // User belum submit
  | 'pending' // Submitted, waiting review
  | 'under_review' // Admin sedang review
  | 'interview' // Dipanggil interview
  | 'waiting_list' // Masuk waiting list
  | 'recommended' // Direkomendasi ke partner
  | 'placed' // Berhasil ditempatkan
  | 'rejected' // Ditolak

export interface ApplicationStatusInfo {
  status: ApplicationStatus
  label: string
  description: string
  color: string
  icon: string
  isCompleted: boolean
  timestamp?: string
}

export interface TimelineStep {
  status: ApplicationStatus
  label: string
  description: string
  color: string
  icon: string
  isCompleted: boolean
  isCurrent: boolean
  timestamp?: string
}
