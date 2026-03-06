import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 3000,
    },
    preview: {
      port: 3001,
    },
    build: {
      sourcemap: !isProduction,
      outDir: 'dist',
      emptyOutDir: true,
      minify: isProduction ? 'terser' : false,
      terserOptions: isProduction
        ? {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          }
        : undefined,
      rollupOptions: {
        output: {
          assetFileNames: '[name]-[hash][extname]',
          chunkFileNames: '[name]-[hash].js',
          entryFileNames: '[name]-[hash].js',
          manualChunks: {
            react: ['react', 'react-dom'],
            router: ['react-router-dom'],
            query: ['@tanstack/react-query'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@app': path.resolve(process.cwd(), 'src/app'),
        '@pages': path.resolve(process.cwd(), 'src/pages'),
        '@features': path.resolve(process.cwd(), 'src/features'),
        '@entities': path.resolve(process.cwd(), 'src/entities'),
        '@shared': path.resolve(process.cwd(), 'src/shared'),
        '@widgets': path.resolve(process.cwd(), 'src/widgets'),
        '@layouts': path.resolve(process.cwd(), 'src/layouts'),
      },
      extensions: ['.tsx', '.ts', '.js'],
    },
    define: {
      APP_ENV: JSON.stringify(env.APP_ENV),
    },
  };
});
