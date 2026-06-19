import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite is the build tool / dev server (the React equivalent of the
// Angular CLI's `ng serve` / `ng build`). The react plugin enables
// JSX and fast refresh (hot reload while you edit).
export default defineConfig({
  plugins: [react()],
  server: {
    // Honor the PORT env var when one is provided (e.g. by the preview tool),
    // otherwise fall back to Vite's usual 5173.
    port: Number(process.env.PORT) || 5173,
    strictPort: true, // fail loudly instead of silently hopping to another port
  },
})
