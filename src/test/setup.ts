import { beforeEach, vi } from 'vitest'
import { config } from '@vue/test-utils'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { addListener } from 'process'

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  RouterLink: {
    template: '<a><slot /></a>',
  },
  RouterView: {
    template: '<div><slot /></div>',
  },
}))

// Define process for browser environment
if (typeof globalThis.process === 'undefined') {
  globalThis.process = { env: {} } as any
}

//clear all mocks before each test
beforeEach(() => {
  vi.clearAllMocks()
})

// vue test utils global config
config.global.stubs = {
  //stub router components
  RouterLink: {
    template: '<a><slot /></a>',
  },
  RouterView: {
    template: '<div><slot /></div>',
  },
}

//mock router
const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  go: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
}

config.global.mocks = {
  $router: mockRouter,
  $route: {
    params: {},
    query: {},
    path: '/',
    name: 'test',
  },
}

//mocsk browser APIs
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

//mock localStorage & sessionStorage
const storageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: storageMock })
Object.defineProperty(window, 'sessionStorage', { value: storageMock })

//mock environment config
vi.mock('@/config/env', () => ({
  ENV: {
    features: {
      enableErrorTracking: false,
      enableDetailedLogging: true,
    },
  },
  isDev: true,
  isProd: false,
}))
