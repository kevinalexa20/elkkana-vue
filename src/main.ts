import './styles.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { ENV, isDev } from '@/config/env'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// app.mount('#app')
// 🔑 Setup Global Error Handling
if (typeof window !== 'undefined') {
  window.vueApp = app

  // Global Vue error handler
  app.config.errorHandler = (err, instance, info) => {
    console.error('Global Vue Error:', err, info)

    // Use our error handler (import async to avoid circular deps)
    import('./composables/useErrorHandler').then(({ useErrorHandler }) => {
      const { handleError } = useErrorHandler()
      handleError(err)
    })
  }

  // Global unhandled promise rejection
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason)

    import('./composables/useErrorHandler').then(({ useErrorHandler }) => {
      const { handleError } = useErrorHandler()
      handleError(event.reason)
    })

    event.preventDefault() // Prevent browser default behavior
  })
}

// Initialize auth state before mounting app
const authStore = useAuthStore()
authStore.initialize().then(() => {
  app.mount('#app')
})
