import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/piano_chord_practice/",
  plugins: [
    react(),
    tailwindcss(),
  ],
})
