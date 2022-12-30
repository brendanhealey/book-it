import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import packageJson from './package.json';

const getPackageName = () => {
  return packageJson.name;
};

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, char => char[1].toUpperCase());
  } catch (err) {
    throw new Error('Name property in package.json is missing.');
  }
};

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: `${getPackageNameCamelCase()}`,
      formats: ['es', 'cjs', 'iife'],
      fileName: `${getPackageName()}`,
    },
    rollupOptions: {
      watch: {
        include: 'src/**',
      },
      // this significantly reduces the size of the .js & .mjs files created in dist
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
