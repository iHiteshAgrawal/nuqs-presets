import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'hooks/pagination/index': 'src/hooks/pagination/index.ts',
    'hooks/filtering/index': 'src/hooks/filtering/index.ts',
    'hooks/sorting/index': 'src/hooks/sorting/index.ts',
    'hooks/search/index': 'src/hooks/search/index.ts',
    'hooks/tabs/index': 'src/hooks/tabs/index.ts',
    'hooks/date-range/index': 'src/hooks/date-range/index.ts',
    'hooks/multi-select/index': 'src/hooks/multi-select/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'nuqs', 'zod'],
  treeshake: true,
  minify: true,
  target: 'es2020',
})
