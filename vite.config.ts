import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,

    // 🔥 Aqui está o segredo
    environmentMatchGlobs: [
      ['src/http/**/*.spec.ts', './prisma/vitest-environment-prisma'],
    ],
  },
})
