import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'github' ? '/heartshome/' : '/',
  build: {
    sourcemap: false,
  },
  plugins: [react(), cloudflare()],
}))