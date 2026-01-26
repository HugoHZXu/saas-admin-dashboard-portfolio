import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { resolve } from 'path';
import { readdirSync, mkdirSync, copyFileSync, statSync } from 'fs';

const copyLangFiles = () => ({
  name: 'copy-lang-files',
  closeBundle() {
    const srcDir = resolve(__dirname, 'src/lang');
    const destDir = resolve(__dirname, 'dist/lang');

    const copyRecursive = (from: string, to: string) => {
      const stat = statSync(from);
      if (stat.isDirectory()) {
        mkdirSync(to, { recursive: true });
        for (const entry of readdirSync(from)) {
          copyRecursive(resolve(from, entry), resolve(to, entry));
        }
        return;
      }
      mkdirSync(path.dirname(to), { recursive: true });
      copyFileSync(from, to);
    };

    copyRecursive(srcDir, destDir);
  },
});

export default defineConfig({
  plugins: [react(), copyLangFiles()],
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
