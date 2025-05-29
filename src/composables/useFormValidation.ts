import { ref, computed } from 'vue'

export interface ValidationRule {
  test: (value: any) => boolean
  message: string
}

export function useFormValidation() {
  const errors = ref<Record<string, string>>({})

  // Common validation rules
  const rules = {
    required: (message = 'This field is required'): ValidationRule => ({
      test: (value: any) => !!value && value.toString().trim() !== '',
      message,
    }),

    email: (message = 'Please enter a valid email'): ValidationRule => ({
      test: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value)
      },
      message,
    }),

    minLength: (min: number, message?: string): ValidationRule => ({
      test: (value: string) => !!value && value.length >= min,
      message: message || `Must be at least ${min} characters`,
    }),

    maxLength: (max: number, message?: string): ValidationRule => ({
      test: (value: string) => !value || value.length <= max,
      message: message || `Must be no more than ${max} characters`,
    }),

    // password: (message = 'Password must be at least 8 characters'): ValidationRule => ({
    //   test: (value: string) => value && value.length >= 8,
    //   message,
    // }),
    password: (message = 'Password must be at least 8 characters'): ValidationRule => ({
      test: (value: string) => {
        if (!value) return false
        return value.length >= 8
      },
      message,
    }),
  }

  // Validate single field
  const validateField = (value: any, fieldRules: ValidationRule[]): string | null => {
    for (const rule of fieldRules) {
      if (!rule.test(value)) {
        return rule.message
      }
    }
    return null
  }

  // Validate form
  const validateForm = (
    formData: Record<string, any>,
    validationRules: Record<string, ValidationRule[]>,
  ) => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    for (const [field, fieldRules] of Object.entries(validationRules)) {
      const error = validateField(formData[field], fieldRules)
      if (error) {
        newErrors[field] = error
        isValid = false
      }
    }

    errors.value = newErrors
    return isValid
  }

  // Clear errors
  const clearErrors = () => {
    errors.value = {}
  }

  // Clear specific field error
  const clearFieldError = (field: string) => {
    delete errors.value[field]
  }

  // Check if form has errors
  const hasErrors = computed(() => Object.keys(errors.value).length > 0)

  return {
    errors,
    hasErrors,
    rules,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError,
  }
}
