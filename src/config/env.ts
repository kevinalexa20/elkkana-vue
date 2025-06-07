export const ENV = {
  // Environment detection
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,

  // App configuration
  app: {
    name: 'Elkkana Vue',
    version: '1.0.0',
    url: import.meta.env.PROD ? 'https://www.triekaelkkanacorp.live' : 'http://localhost:5173',
  },

  // Feature flags
  features: {
    showErrorTestPanel: import.meta.env.DEV,
    enableDetailedLogging: import.meta.env.DEV,
    enableErrorBoundaryDetails: import.meta.env.DEV,
    enablePerformanceMonitoring: import.meta.env.PROD,
    enableErrorTracking: import.meta.env.PROD,
  },

  // Logging levels
  logging: {
    level: import.meta.env.DEV ? 'debug' : 'error',
    enableConsole: import.meta.env.DEV,
    enableRemote: import.meta.env.PROD,
  },

  // API Configuration
  api: {
    timeout: import.meta.env.DEV ? 10000 : 5000,
    retryAttempts: import.meta.env.DEV ? 1 : 3,
  },
} as const

// Export commonly used flags
export const { isDev, isProd } = ENV
export const isProduction = isProd
export const isDevelopment = isDev
