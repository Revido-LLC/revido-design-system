import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/theme/preset.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  outDir: 'dist',
  splitting: true,
  treeshake: true,
  clean: true,
  external: ['react', 'react-dom', 'tailwindcss'],
})
