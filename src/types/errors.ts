export interface AppError {
  message: string
  code?: string | number
  type: 'auth' | 'network' | 'validation' | 'server' | 'client'
  severity?: 'error' | 'warning' | 'info' | 'success'
  stack?: string
  statusCode?: number
  timestamp: Date
  context?: Record<string, any>
}

export interface ErrorHandler {
  handleError: (error: unknown) => void
  clearError: () => void
  getCurrentError: () => AppError | null
  getErrorHistory: () => AppError[]
}
