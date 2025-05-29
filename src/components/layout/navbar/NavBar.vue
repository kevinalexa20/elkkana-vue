<script setup lang="ts">
import ThemeController from '@/components/ui/ThemeController.vue'
import { useAuth } from '@/composables/useAuth'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const navbarHeight = 70
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    })
  }
}

const { user, isAuthenticated, logout, isLoading } = useAuth()

const userAvatar = computed(() => {
  return 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
})

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
        <li class="mt-2">
          <RouterLink to="/" @click="scrollToSection('hero')" class="cursor-pointer">
            Home
          </RouterLink>
        </li>
        <li class="mt-2">
          <a @click="scrollToSection('about')" class="cursor-pointer">About</a>
        </li>
        <li class="mt-2">
          <a @click="scrollToSection('services')" class="cursor-pointer">Services</a>
        </li>
        <li class="mt-2">
          <a @click="scrollToSection('contact')" class="cursor-pointer">Contact</a>
        </li>

        <!-- FIXED: Avatar dropdown with proper positioning -->
        <li v-if="isAuthenticated">
          <!-- Use dropdown class instead of details -->
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-8 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                <img :src="userAvatar" :alt="user?.name || 'User Avatar'" />
              </div>
            </div>

            <!-- FIXED: Proper dropdown menu positioning -->
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-base-300"
            >
              <!-- User Info Header -->
              <li class="menu-title px-3 py-2">
                <div class="flex flex-col">
                  <span class="font-semibold text-base-content">{{ user?.name || 'User' }}</span>
                  <span class="text-xs text-base-content/60 truncate">{{ user?.email }}</span>
                </div>
              </li>

              <li><hr class="my-1 border-base-300" /></li>

              <!-- Menu Items -->
              <li>
                <RouterLink to="/dashboard" class="flex items-center gap-3 py-2">
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
                  <span>Dashboard</span>
                </RouterLink>
              </li>

              <li>
                <RouterLink to="/profile/edit" class="flex items-center gap-3 py-2">
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
                  <span>Edit Profile</span>
                </RouterLink>
              </li>

              <li>
                <a class="flex items-center gap-3 py-2 opacity-50 cursor-not-allowed">
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
                  <span>Settings</span>
                </a>
              </li>

              <li><hr class="my-1 border-base-300" /></li>

              <li>
                <a
                  @click="handleLogout"
                  class="flex items-center gap-3 py-2 text-error hover:bg-error/10"
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
                  <span v-if="!isLoading" class="loading loading-spinner loading-xs"></span>
                  <span>{{ isLoading ? 'Logging out...' : 'Logout' }}</span>
                </a>
              </li>
            </ul>
          </div>
        </li>

        <!-- Show Join Us when not authenticated -->
        <li v-else>
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost">
              Join Us
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow-lg border border-base-300"
            >
              <li>
                <RouterLink to="/login" class="flex items-center gap-3 py-2">
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
                  <span>Login</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/register" class="flex items-center gap-3 py-2">
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
                  <span>Register</span>
                </RouterLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
