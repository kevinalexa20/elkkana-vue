# 🚢 Elkkana Vue - Crew Management Platform

A modern web application for maritime crew recruitment and profile management, built with Vue 3, TypeScript, and Appwrite.

## 🚀 Features

- **Authentication**: Secure user registration and login
- **Profile Management**: Comprehensive crew profile creation with document uploads
- **Application Tracking**: Real-time application status updates
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Modern Architecture**: Composables-based Vue 3 with Pinia state management

## 🛠️ Tech Stack

- **Frontend**: Vue 3 + TypeScript + Vite
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: Pinia
- **Backend**: Appwrite (BaaS)
- **Testing**: Vitest + Vue Test Utils
- **Build Tool**: Vite

## 📦 Installation

```bash
# Clone repository
git clone [your-repo-url]
cd elkkana-vue

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Fill in your Appwrite credentials

# Start development server
npm run dev
```

## 🧪 Testing

```bash
# Run unit tests
npm run test:unit

# Run tests in watch mode
npm run test:unit -- --watch
```

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Preview build locally
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
├── composables/         # Vue composables for logic reuse
├── stores/             # Pinia stores
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── config/             # App configuration
└── assets/             # Static assets
```
