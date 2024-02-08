import { defineConfig } from "vite";

export default defineConfig({
  server: {
    headers: {
      'Content-Security-Policy': `default-src 'self'; connect-src 'self'; font-src 'self'; frame-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; report-uri /report_csp`,
    },
  },
})