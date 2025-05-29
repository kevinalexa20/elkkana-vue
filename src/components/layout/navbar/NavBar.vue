<script setup lang="ts">
import ThemeController from '@/components/ui/ThemeController.vue'
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
        <li>
          <details>
            <summary>Join Us</summary>
            <ul class="bg-base-100 rounded-t-none p-2">
              <li><RouterLink to="/login">Login</RouterLink></li>
              <li><RouterLink to="/register">Register</RouterLink></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>
