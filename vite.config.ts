import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite is the build tool / dev server (the React equivalent of the
// Angular CLI's `ng serve` / `ng build`). The react plugin enables
// JSX and fast refresh (hot reload while you edit).
export default defineConfig({
  plugins: [react()],
})
