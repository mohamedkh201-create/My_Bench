import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import fs from 'fs'

// SSL certificates path (copied to the app folder to avoid permission issues)
const sslCertPath = resolve(__dirname, 'ssl')

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    cors: true,
    host: '0.0.0.0',
    allowedHosts: 'all',
    https: fs.existsSync(`${sslCertPath}/fullchain.pem`) ? {
      key: fs.readFileSync(`${sslCertPath}/privkey.pem`),
      cert: fs.readFileSync(`${sslCertPath}/fullchain.pem`),
    } : false,
    hmr: {
      protocol: 'wss',
      host: 'frappe.ahmedhashim.site',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/assets': 'http://localhost:8000',
      '/files': 'http://localhost:8000',
    },
  },
  build: {
    outDir: '../foodiex/public/frontend',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/main.jsx'),
    },
  },
  base: command === 'serve' ? '/' : '/assets/foodiex/frontend/',
}))
