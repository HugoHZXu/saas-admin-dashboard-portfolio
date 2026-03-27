import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

const copyLibraryStyles = () => ({
  name: 'copy-library-styles',
  closeBundle() {
    mkdirSync(resolve(__dirname, 'dist'), { recursive: true });
    copyFileSync(
      resolve(__dirname, 'src/styles/globals.css'),
      resolve(__dirname, 'dist/styles.css')
    );
  },
});

const copyPackageMetadata = () => ({
  name: 'copy-package-metadata',
  closeBundle() {
    mkdirSync(resolve(__dirname, 'dist'), { recursive: true });
    copyFileSync(resolve(__dirname, 'components.json'), resolve(__dirname, 'dist/components.json'));
  },
});

export default defineConfig({
  plugins: [react(), copyLibraryStyles(), copyPackageMetadata()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    lib: {
      entry: {
        index: 'src/index.ts',
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: (id: string) => !id.startsWith('.') && !path.isAbsolute(id),
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
});
