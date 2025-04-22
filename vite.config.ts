import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ absolute path
    },
  },
  envPrefix: 'VITE_', // ✅ Make sure VITE_ prefix is set
});
