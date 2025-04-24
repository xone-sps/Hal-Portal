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
  envPrefix: 'VITE_',
  ...{
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"] // Map "@" to the "src" directory
      }
    },
    "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
  },
});
