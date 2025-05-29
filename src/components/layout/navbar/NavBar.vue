<script setup lang="ts">
import ThemeController from '@/components/ui/ThemeController.vue'
import { useAuth } from '@/composables/useAuth'
import { computed } from 'vue'
import { RouterLink } from 'vue-router' // Import RouterLink

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const navbarHeight = 70 // Sesuaikan dengan tinggi navbar Anda
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    })
  }
}

// Auth composable
const { user, isAuthenticated, logout, isLoading } = useAuth()

// Computed for user avatar
const userAvatar = computed(() => {
  // You can add logic here to get user's actual avatar
  // For now, we'll use a default avatar or user's profile picture
  return 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
})

// Logout handler
const handleLogout = async () => {
  if (confirm('Apakah Anda yakin ingin logout?')) {
    const result = await logout()
    if (result.success) {
      console.log('✅ Logout successful from navbar')
    }
  }
}
</script>

<template>
  <div class="navbar bg-base-300 shadow-sm">
    <div class="flex-1">
      <RouterLink to="/" @click="scrollToSection('hero')" class="btn btn-ghost text-xl">
        <img src="@/assets/images/logo.svg" alt="Logo" class="w-10 h-10" />
      </RouterLink>
    </div>
    <div class="flex-none">
      <ThemeController />
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li>
          <RouterLink to="/" @click="scrollToSection('hero')" class="cursor-pointer"
            >Home</RouterLink
          >
        </li>
        <li><a @click="scrollToSection('about')" class="cursor-pointer">About</a></li>
        <li><a @click="scrollToSection('services')" class="cursor-pointer">Services</a></li>
        <li><a @click="scrollToSection('contact')" class="cursor-pointer">Contact</a></li>
        <!-- <li>
          <details>
            <summary>Join Us</summary>
            <ul class="bg-base-100 rounded-t-none p-2">
              <li><RouterLink to="/login">Login</RouterLink></li>
              <li><RouterLink to="/register">Register</RouterLink></li>
            </ul>
          </details>
        </li> -->
        <!-- Conditional rendering: Avatar or Join Us -->
        <!-- Show Avatar when authenticated -->
        <li v-if="isAuthenticated">
          <details>
            <summary class="p-0">
              <div class="avatar">
                <div
                  class="w-8 h-8 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100"
                >
                  <img :src="userAvatar" :alt="user?.name || 'User Avatar'" />
                </div>
              </div>
            </summary>
            <ul class="bg-base-100 rounded-t-none p-2 w-48 z-50">
              <li class="menu-title">
                <span>{{ user?.name || 'User' }}</span>
                <span class="text-xs text-base-content/60">{{ user?.email }}</span>
              </li>
              <div class="divider my-1"></div>
              <li>
                <RouterLink to="/dashboard" class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
                    />
                  </svg>
                  Dashboard
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/profile/edit" class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Edit Profile
                </RouterLink>
              </li>
              <li>
                <a class="flex items-center gap-2" disabled>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </a>
              </li>
              <div class="divider my-1"></div>
              <li>
                <a
                  @click="handleLogout"
                  class="flex items-center gap-2 text-error"
                  :class="{ loading: isLoading }"
                  :disabled="isLoading"
                >
                  <svg
                    v-if="!isLoading"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>{{ isLoading ? 'Logging out...' : 'Logout' }}</span>
                </a>
              </li>
            </ul>
          </details>
        </li>

        <!-- Show Join Us when not authenticated -->
        <li v-else>
          <details>
            <summary>Join Us</summary>
            <ul class="bg-base-100 rounded-t-none p-2 w-40">
              <li>
                <RouterLink to="/login" class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Login
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/register" class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Register
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>
