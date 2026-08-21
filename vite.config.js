import { defineConfig } from 'vite';

export default defineConfig({
  base: '/GWBoard/',
  build: {
    sourcemap: true,
    target: 'es2022',
  },
  server: {
    host: '0.0.0.0',
  },
  preview: {
    host: '0.0.0.0',
  },
});
