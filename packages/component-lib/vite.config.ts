import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import * as path from 'path';
import { resolve } from 'path';
import packageJson from './package.json';
import fg from 'fast-glob';

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
  plugins: [
    react({
      // Exclude storybook stories
      exclude: /\.stories\.(t|j)sx?$/,
      // Only .tsx files
      include: '**/*.tsx',
    }),
    // {
    //   name: 'watch-external',
    //   async buildStart() {
    //     const files = await fg('src/**/*');
    //     for (let file of files) {
    //       console.log('watch file: ', file);
    //       this.addWatchFile(file);
    //     }
    //   },
    // },
  ],
  build: {
    emptyOutDir: false,
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
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'prop-types',
        '@emotion/react',
        '@emotion/styled',
        '@mui/lab',
        '@mui/joy',
        '@mui/icons-material',
        '@mui/material',
        '@mui/material/styles',
        '@mui/styles',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
  resolve: {
    alias: {
      'my-placeholder': path.join(__dirname, './src'),
    },
  },
});
