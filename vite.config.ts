import { defineConfig } from 'vite'
import { name } from './package.json'
export default defineConfig({
  base: './',
  build: {
    cssCodeSplit: false,
    lib: {
      entry: './src/main.js',
      name,
      formats: ['cjs', 'es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
  },
})
