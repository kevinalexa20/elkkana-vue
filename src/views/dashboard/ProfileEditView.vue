<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// Form data sesuai blueprint
const formData = ref({
  // Personal Data
  fullName: '',
  placeOfBirth: '',
  dateOfBirth: '',

  // File uploads (akan menyimpan File objects)
  cvFile: null,
  photoFile: null,
  passportFile: null,
  visaFile: null,
  ktpFile: null,
  seamanBookFile: null,
  bstCertificateFile: null,
  satCertificateFile: null,
  mcuCertificateFile: null,
  skillCertificateFiles: [],
  lastEducationDiplomaFile: null,
  seaServiceRecordFiles: [],
  skckFile: null,
  npwpFile: null,
  otherSupportingDocuments: [],

  // Consent
  consentGiven: false,
})

const handleFileUpload = (event: Event, fieldName: string) => {
  const target = event.target as HTMLInputElement
  // if (target.files && target.files[0]) {
  //   formData.value[fieldName] = target.files[0]
  // }
}

const handleMultipleFileUpload = (event: Event, fieldName: string) => {
  const target = event.target as HTMLInputElement
  // if (target.files) {
  //   formData.value[fieldName] = Array.from(target.files)
  // }
}

const saveProfile = async () => {
  // TODO: Implement Appwrite upload dan save
  console.log('Saving profile...', formData.value)
  alert('Profil berhasil disimpan!')
}
</script>

<template>
  <div class="min-h-screen bg-base-200 p-4">
    <div class="container mx-auto max-w-4xl">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <RouterLink to="/dashboard" class="btn btn-ghost btn-sm">
          ← Kembali ke Dashboard
        </RouterLink>
        <div>
          <h1 class="text-3xl font-bold">Edit Profil</h1>
          <p class="text-base-content/70">Lengkapi data untuk melamar sebagai crew</p>
        </div>
      </div>

      <form @submit.prevent="saveProfile">
        <!-- 1. Data Pribadi -->
        <div class="card bg-base-100 shadow-xl mb-6">
          <div class="card-body">
            <h2 class="card-title">Data Pribadi</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Nama Lengkap *</span>
                </label>
                <input
                  type="text"
                  v-model="formData.fullName"
                  class="input input-bordered"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Tempat Lahir</span>
                </label>
                <input type="text" v-model="formData.placeOfBirth" class="input input-bordered" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Tanggal Lahir</span>
                </label>
                <input type="date" v-model="formData.dateOfBirth" class="input input-bordered" />
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Dokumen Wajib -->
        <div class="card bg-base-100 shadow-xl mb-6">
          <div class="card-body">
            <h2 class="card-title">Dokumen Wajib</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">CV / Resume *</span>
                </label>
                <input
                  type="file"
                  @change="handleFileUpload($event, 'cvFile')"
                  accept=".pdf,.doc,.docx"
                  class="file-input file-input-bordered"
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Pas Foto *</span>
                </label>
                <input
                  type="file"
                  @change="handleFileUpload($event, 'photoFile')"
                  accept="image/*"
                  class="file-input file-input-bordered"
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Passport</span>
                </label>
                <input
                  type="file"
                  @change="handleFileUpload($event, 'passportFile')"
                  accept=".pdf,image/*"
                  class="file-input file-input-bordered"
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">KTP</span>
                </label>
                <input
                  type="file"
                  @change="handleFileUpload($event, 'ktpFile')"
                  accept=".pdf,image/*"
                  class="file-input file-input-bordered"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Dokumen Pelaut -->
        <div class="card bg-base-100 shadow-xl mb-6">
          <div class="card-body">
            <h2 class="card-title">Dokumen Pelaut</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Seaman Book</span>
                </label>
                <input
                  type="file"
                  @change="handleFileUpload($event, 'seamanBookFile')"
                  accept=".pdf,image/*"
                  class="file-input file-input-bordered"
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Sertifikat BST</span>
                </label>
                <input
                  type="file"
                  @change="handleFileUpload($event, 'bstCertificateFile')"
                  accept=".pdf,image/*"
                  class="file-input file-input-bordered"
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Sertifikat SAT</span>
                </label>
                <input
                  type="file"
                  @change="handleFileUpload($event, 'satCertificateFile')"
                  accept=".pdf,image/*"
                  class="file-input file-input-bordered"
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Sertifikat MCU</span>
                </label>
                <input
                  type="file"
                  @change="handleFileUpload($event, 'mcuCertificateFile')"
                  accept=".pdf,image/*"
                  class="file-input file-input-bordered"
                />
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Sertifikat Keahlian Lain (Multiple)</span>
              </label>
              <input
                type="file"
                @change="handleMultipleFileUpload($event, 'skillCertificateFiles')"
                accept=".pdf,image/*"
                multiple
                class="file-input file-input-bordered"
              />
            </div>
          </div>
        </div>

        <!-- 4. Dokumen Pendidikan & Pengalaman -->
        <div class="card bg-base-100 shadow-xl mb-6">
          <div class="card-body">
            <h2 class="card-title">Pendidikan & Pengalaman</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Ijazah Pendidikan Terakhir</span>
                </label>
                <input
                  type="file"
                  @change="handleFileUpload($event, 'lastEducationDiplomaFile')"
                  accept=".pdf,image/*"
                  class="file-input file-input-bordered"
                />
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Surat Pengalaman Berlayar (Multiple)</span>
              </label>
              <input
                type="file"
                @change="handleMultipleFileUpload($event, 'seaServiceRecordFiles')"
                accept=".pdf,image/*"
                multiple
                class="file-input file-input-bordered"
              />
            </div>
          </div>
        </div>

        <!-- 5. Dokumen Tambahan -->
        <div class="card bg-base-100 shadow-xl mb-6">
          <div class="card-body">
            <h2 class="card-title">Dokumen Tambahan</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">SKCK</span>
                </label>
                <input
                  type="file"
                  @change="handleFileUpload($event, 'skckFile')"
                  accept=".pdf,image/*"
                  class="file-input file-input-bordered"
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">NPWP</span>
                </label>
                <input
                  type="file"
                  @change="handleFileUpload($event, 'npwpFile')"
                  accept=".pdf,image/*"
                  class="file-input file-input-bordered"
                />
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Dokumen Pendukung Lain (Multiple)</span>
              </label>
              <input
                type="file"
                @change="handleMultipleFileUpload($event, 'otherSupportingDocuments')"
                accept=".pdf,image/*"
                multiple
                class="file-input file-input-bordered"
              />
            </div>
          </div>
        </div>

        <!-- 6. Disclaimer & Persetujuan -->
        <div class="card bg-base-100 shadow-xl mb-6">
          <div class="card-body">
            <h2 class="card-title">Disclaimer & Persetujuan</h2>
            <div class="form-control">
              <label class="label cursor-pointer justify-start gap-4">
                <input
                  type="checkbox"
                  v-model="formData.consentGiven"
                  class="checkbox checkbox-primary"
                  required
                />
                <span class="label-text">
                  Saya menyetujui bahwa data yang saya berikan adalah benar dan dapat digunakan
                  untuk proses seleksi crew kapal. Saya juga menyetujui kebijakan privasi PT Elkkana
                  Corp.
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-4 justify-end">
          <RouterLink to="/dashboard" class="btn btn-outline">Batal</RouterLink>
          <button type="submit" class="btn btn-primary" :disabled="!formData.consentGiven">
            Simpan Profil
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
