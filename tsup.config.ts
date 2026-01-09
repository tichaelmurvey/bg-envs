import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    sourcemap: true,
    minify: false,        // Keep readable for debugging during development
    splitting: false,     // Single entry point, no code splitting needed
    treeshake: true,
})