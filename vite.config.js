import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'github' ? '/heartshome/' : '/',
  build: {
    sourcemap: false,
  },
  plugins: [react()],
}))
