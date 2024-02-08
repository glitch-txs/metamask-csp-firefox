import { defineConfig } from "vite";

export default defineConfig({
  server: {
    headers: {
      'Content-Security-Policy': `default-src 'self'; connect-src 'self';`,
    },
  },
})