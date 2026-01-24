import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    lib: {
      entry: {
        index: 'src/index.ts',
        'utils/wcagUtils': 'src/utils/wcagUtils.ts',
        'styles/theme': 'src/styles/theme.ts',
      },
      formats: ['es'],
    },
    rollupOptions: {
      // Treat all non-relative, non-absolute imports as externals to avoid bundling deps.
      external: (id: string) => !id.startsWith('.') && !path.isAbsolute(id),
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
});
