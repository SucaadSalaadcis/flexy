import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //     proxy: {
  //         '/api': 'https://peculiar-darkness-68u4yutcfh.ploi.dev',
  //     },
  // },
})

