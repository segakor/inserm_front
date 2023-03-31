import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' 
import 'vite/client' //NOTE: фикс "evn Property 'env' does not exist on type 'ImportMeta'""
/// <reference types="vite-plugin-svgr/client" />

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    svgr({ 
      svgrOptions: {
        // svgr options
      },
    }),
  ], 
})