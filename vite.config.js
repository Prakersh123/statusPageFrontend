/*
 *Filename: /home/codestax/statusPage/vite-project/vite.config.js              *
 *Path: /home/codestax/statusPage/vite-project                                 *
 *Created Date: Saturday, February 1st 2025, 12:58:41 pm                       *
 *Author: Prakersharya                                                         *
 *                                                                             *
 *Copyright (c) 2025 Trinom Digital Pvt Ltd                                    *
 */

import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
