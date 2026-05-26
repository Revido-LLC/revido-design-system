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
  onSuccess: async () => {
    const fs = await import('fs')
    fs.mkdirSync('dist', { recursive: true })
    const tokens = fs.readFileSync('src/theme/tokens.css', 'utf-8')
    const dark = fs.readFileSync('src/theme/dark.css', 'utf-8')
    fs.writeFileSync('dist/styles.css', `${tokens}\n${dark}`)
  },
})
