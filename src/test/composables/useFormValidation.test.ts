import { describe, it, expect, beforeEach } from 'vitest'
import { useFormValidation } from '@/composables/useFormValidation'

describe('useFormValidation composable', () => {
  let formValidation: ReturnType<typeof useFormValidation>

  beforeEach(() => {
    formValidation = useFormValidation()
  })

  describe('validation rules', () => {
    describe('required rule', () => {
      it('should pass for non-empty values', () => {
        const rule = formValidation.rules.required()

        expect(rule.test('test')).toBe(true)
        expect(rule.test('123')).toBe(true)
        expect(rule.test(' valid ')).toBe(true)
      })

      it('should fail for empty values', () => {
        const rule = formValidation.rules.required()

        expect(rule.test('')).toBe(false)
        expect(rule.test('   ')).toBe(false)
        expect(rule.test(null)).toBe(false)
        expect(rule.test(undefined)).toBe(false)
      })

      it('should return custom error message', () => {
        const customMessage = 'Custom required message'
        const rule = formValidation.rules.required(customMessage)

        expect(rule.message).toBe(customMessage)
      })
    })

    describe('email rule', () => {
      it('should pass for valid emails', () => {
        const rule = formValidation.rules.email()

        expect(rule.test('test@example.com')).toBe(true)
        expect(rule.test('user.name@domain.co.id')).toBe(true)
        expect(rule.test('123@test.org')).toBe(true)
      })

      it('should fail for invalid emails', () => {
        const rule = formValidation.rules.email()

        expect(rule.test('invalid-email')).toBe(false)
        expect(rule.test('test@')).toBe(false)
        expect(rule.test('@domain.com')).toBe(false)
        expect(rule.test('test.domain.com')).toBe(false)
        expect(rule.test('')).toBe(false)
      })
    })

    describe('password rule', () => {
      it('should pass for valid passwords', () => {
        const rule = formValidation.rules.password()

        expect(rule.test('password123')).toBe(true)
        expect(rule.test('12345678')).toBe(true)
        expect(rule.test('verylongpassword')).toBe(true)
      })

      it('should fail for invalid passwords', () => {
        const rule = formValidation.rules.password()

        expect(rule.test('1234567')).toBe(false) // too short
        expect(rule.test('')).toBe(false) // empty
        expect(rule.test(null)).toBe(false) // null
      })
    })

    describe('minLength rule', () => {
      it('should pass for valid length', () => {
        const rule = formValidation.rules.minLength(5)

        expect(rule.test('12345')).toBe(true)
        expect(rule.test('123456')).toBe(true)
      })

      it('should fail for too short values', () => {
        const rule = formValidation.rules.minLength(5)

        expect(rule.test('1234')).toBe(false)
        expect(rule.test('')).toBe(false)
      })
    })

    describe('maxLength rule', () => {
      it('should pass for valid length', () => {
        const rule = formValidation.rules.maxLength(10)

        expect(rule.test('12345')).toBe(true)
        expect(rule.test('1234567890')).toBe(true)
        expect(rule.test('')).toBe(true) // empty is valid
      })

      it('should fail for too long values', () => {
        const rule = formValidation.rules.maxLength(5)

        expect(rule.test('123456')).toBe(false)
      })
    })
  })

  describe('field validation', () => {
    it('should validate single field correctly', () => {
      const rules = [formValidation.rules.required(), formValidation.rules.email()]

      // Valid case
      expect(formValidation.validateField('test@example.com', rules)).toBe(null)

      // Invalid cases
      expect(formValidation.validateField('', rules)).toBe('This field is required')
      expect(formValidation.validateField('invalid-email', rules)).toBe(
        'Please enter a valid email',
      )
    })
  })

  describe('form validation', () => {
    it('should validate complete form successfully', () => {
      const formData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'John Doe',
      }

      const validationRules = {
        email: [formValidation.rules.required(), formValidation.rules.email()],
        password: [formValidation.rules.required(), formValidation.rules.password()],
        name: [formValidation.rules.required(), formValidation.rules.minLength(2)],
      }

      const isValid = formValidation.validateForm(formData, validationRules)

      expect(isValid).toBe(true)
      expect(formValidation.hasErrors.value).toBe(false)
      expect(Object.keys(formValidation.errors.value)).toHaveLength(0)
    })

    it('should return errors for invalid form', () => {
      const formData = {
        email: 'invalid-email',
        password: '123', // too short
        name: '', // required
      }

      const validationRules = {
        email: [formValidation.rules.required(), formValidation.rules.email()],
        password: [formValidation.rules.required(), formValidation.rules.password()],
        name: [formValidation.rules.required()],
      }

      const isValid = formValidation.validateForm(formData, validationRules)

      expect(isValid).toBe(false)
      expect(formValidation.hasErrors.value).toBe(true)
      expect(formValidation.errors.value.email).toBe('Please enter a valid email')
      expect(formValidation.errors.value.password).toBe('Password must be at least 8 characters')
      expect(formValidation.errors.value.name).toBe('This field is required')
    })
  })

  describe('error management', () => {
    beforeEach(() => {
      // Setup some errors first
      formValidation.errors.value = {
        email: 'Email error',
        password: 'Password error',
      }
    })

    it('should clear all errors', () => {
      formValidation.clearErrors()

      expect(formValidation.errors.value).toEqual({})
      expect(formValidation.hasErrors.value).toBe(false)
    })

    it('should clear specific field error', () => {
      formValidation.clearFieldError('email')

      expect(formValidation.errors.value.email).toBeUndefined()
      expect(formValidation.errors.value.password).toBe('Password error')
    })
  })
})
