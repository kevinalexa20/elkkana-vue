export interface ProfileData {
  // Required fields
  userId: string
  fullName: string
  consentGiven: boolean

  // Personal data
  placeOfBirth?: string
  dateOfBirth?: string // Will be converted to Datetime in Appwrite

  // Document File IDs (stored as file references)
  cvFileId?: string
  photoFileId?: string
  passportFileId?: string
  visaFileId?: string
  ktpFileId?: string
  seamanBookFileId?: string
  bstCertificateFileId?: string
  satCertificateFileId?: string
  mcuCertificateFileId?: string
  skillCertificateIds?: string[] // Array for multiple skill certificates
  lastEducationDiplomaFileId?: string
  seaServiceRecordFileIds?: string[] // Array for multiple sea service records
  skckFileId?: string
  npwpFileId?: string
  otherSupportingDocumentIds?: string[] // Array for other documents

  // Application status
  applicationStatus?: string
  profileLastUpdatedAt?: string
}

// For form handling
export interface ProfileFormData {
  fullName: string
  placeOfBirth: string
  dateOfBirth: string
  consentGiven: boolean

  // Files will be handled separately in upload process
  cvFile?: File
  photoFile?: File
  passportFile?: File
  visaFile?: File
  ktpFile?: File
  seamanBookFile?: File
  bstCertificateFile?: File
  satCertificateFile?: File
  mcuCertificateFile?: File
  skillCertificate?: File[]
  lastEducationDiplomaFile?: File
  seaServiceRecordFiles?: File[]
  skckFile?: File
  npwpFile?: File
  otherSupportingDocumentFiles?: File[]
}

export type DocumentType =
  | 'cv'
  | 'photo'
  | 'passport'
  | 'visa'
  | 'ktp'
  | 'seamanBook'
  | 'bstCertificate'
  | 'satCertificate'
  | 'mcuCertificate'
  | 'skillCertificate'
  | 'lastEducationDiploma'
  | 'seaServiceRecord'
  | 'skck'
  | 'npwp'
  | 'otherSupportingDocument'

export interface UploadedDocument {
  id: string
  name: string
  type: DocumentType
  size: number
  uploadedAt: string
}

export interface DocumentCategory {
  title: string
  description: string
  documents: {
    type: DocumentType
    label: string
    required: boolean
    acceptedFormats: string[]
    multiple?: boolean
  }[]
}
