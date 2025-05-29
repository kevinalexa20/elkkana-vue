import type { DocumentCategory } from '@/types/profile'

export const documentCategories: DocumentCategory[] = [
  {
    title: 'Essential Documents',
    description: 'Required documents for all applications',
    documents: [
      {
        type: 'cv',
        label: 'CV / Resume',
        required: true,
        acceptedFormats: ['.pdf', '.doc', '.docx'],
      },
      {
        type: 'photo',
        label: 'Passport Photo',
        required: true,
        acceptedFormats: ['.jpg', '.jpeg', '.png'],
      },
    ],
  },
  {
    title: 'Identification Documents',
    description: 'Identity and travel documents',
    documents: [
      {
        type: 'ktp',
        label: 'KTP (Indonesian ID)',
        required: false,
        acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
      },
      {
        type: 'passport',
        label: 'Passport',
        required: false,
        acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
      },
      {
        type: 'visa',
        label: 'Visa (if applicable)',
        required: false,
        acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
      },
    ],
  },
  {
    title: 'Maritime Documents',
    description: 'Seaman certificates and maritime qualifications',
    documents: [
      {
        type: 'seamanBook',
        label: 'Seaman Book',
        required: false,
        acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
      },
      {
        type: 'bstCertificate',
        label: 'BST Certificate',
        required: false,
        acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
      },
      {
        type: 'satCertificate',
        label: 'SAT Certificate',
        required: false,
        acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
      },
    ],
  },
  {
    title: 'Medical & Health',
    description: 'Medical certificates and health documents',
    documents: [
      {
        type: 'mcuCertificate',
        label: 'MCU Certificate',
        required: false,
        acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
      },
    ],
  },
  {
    title: 'Education & Skills',
    description: 'Educational qualifications and skill certificates',
    documents: [
      {
        type: 'lastEducationDiploma',
        label: 'Last Education Diploma',
        required: false,
        acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
      },
      {
        type: 'skillCertificate',
        label: 'Skill Certificates',
        required: false,
        acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
        multiple: true,
      },
    ],
  },
  {
    title: 'Work Experience',
    description: 'Sea service records and work experience',
    documents: [
      {
        type: 'seaServiceRecord',
        label: 'Sea Service Records',
        required: false,
        acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
        multiple: true,
      },
    ],
  },
  {
    title: 'Legal Documents',
    description: 'Legal and administrative documents',
    documents: [
      {
        type: 'skck',
        label: 'SKCK (Police Certificate)',
        required: false,
        acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
      },
      {
        type: 'npwp',
        label: 'NPWP (Tax ID)',
        required: false,
        acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
      },
    ],
  },
  {
    title: 'Additional Documents',
    description: 'Other supporting documents',
    documents: [
      {
        type: 'otherSupportingDocument',
        label: 'Other Supporting Documents',
        required: false,
        acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
        multiple: true,
      },
    ],
  },
]
