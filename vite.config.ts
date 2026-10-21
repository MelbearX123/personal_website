import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Honor PORT when a preview tool provides one; fail instead of hopping ports.
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
  },
})
