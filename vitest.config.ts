import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),

      // Enhanced configuration for portfolio
      globals: true,
      setupFiles: ['./src/test/setup.ts'],

      // Coverage configuration - impressive for interviews
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'lcov'],
        exclude: [
          'node_modules/',
          'src/test/',
          'dist/',
          '**/*.d.ts',
          'src/main.ts',
          'src/router/',
          '**/*.config.*',
        ],
        thresholds: {
          global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
          },
        },
      },

      // Test UI for development
      ui: true,

      // Fix server configuration for UI
      server: {
        deps: {
          inline: ['@vue', '@vueuse', 'vue', 'vue-router'],
        },
      },

      // Mock configuration
      // deps: {
      //   inline: ['@vue', '@vueuse'],
      // },
    },
  }),
)
