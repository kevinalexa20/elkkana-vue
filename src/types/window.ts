import type { Ref } from 'vue'
import type { AppError } from '@/types/errors'

declare global {
  interface Window {
    debugErrorState?: {
      error: Ref<string | null>
      currentError: Ref<AppError | null>
      history: Ref<AppError[]>
    }
  }
}

export {}
