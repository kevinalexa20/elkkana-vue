// import './assets/main.css'
import './styles.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)
const pinia = createPinia()

app.use(createPinia())
app.use(router)

// app.mount('#app')

// Initialize auth state before mounting app
const authStore = useAuthStore()
authStore.initialize().then(() => {
  app.mount('#app')
})
