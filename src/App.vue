<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/layout/navbar/NavBar.vue'
import ErrorToast from './components/ui/ErrorToast.vue'
import { useErrorHandler } from './composables/useErrorHandler'
import ErrorBoundary from './components/ui/ErrorBoundary.vue'
import ErrorTestPanel from '@/components/dev/ErrorTestPanel.vue'

const { error, clearError } = useErrorHandler()
</script>

<template>
  <div id="app">
    <ErrorBoundary>
      <nav class="sticky top-0 z-50">
        <NavBar />
      </nav>
    </ErrorBoundary>

    <!-- <NavBar /> -->
    <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

    <ErrorBoundary>
      <RouterView />
    </ErrorBoundary>

    <!-- Error Toast -->
    <ErrorToast />

    <!-- Development Error Testing Panel -->
    <ErrorTestPanel />

    <!-- Global Error Toast -->
    <!-- <ErrorToast :error="error" :auto-close="true" :duration="6000" @clear="clearError" /> -->
  </div>
</template>

<style scoped>
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
