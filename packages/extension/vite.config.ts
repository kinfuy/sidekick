import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { crx } from '@crxjs/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import vuejsx from '@vitejs/plugin-vue-jsx';
import { shadowDomCssPlugin } from 'vite-plugin-shadowcss';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import zipPack from 'vite-plugin-zip-pack';
import manifest from './manifest.config';
import pkg from './package.json';
export const isDev = process.env.NODE_ENV !== 'production';

// https://vitejs.dev/config/
export default defineConfig({
  // esbuild: {
  //   drop: ['console', 'debugger'],
  // },
  define: {
    __DEV__: isDev,
  },
  plugins: [
    tsconfigPaths(),
    vue(),
    vuejsx(),
    crx({ manifest }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    shadowDomCssPlugin({
      alias: {
        '@': resolve('./src'),
      },
      log: false,
      config: [
        {
          container: '#dev-tester-extension',
          output: 'assets/shadow-styles.css',
          retry: 3,
        },
        {
          key: 'webnotice',
          container: '#web-notice',
          output: 'assets/web-notice.css',
          retry: 10,
        },
        {
          key: 'clickCount',
          container: '#click-count',
          output: 'assets/click-count.css',
          retry: 10,
        },
      ],
    }),
    viteStaticCopy({
      silent: true,
      targets: [
        {
          src: './src/_locales',
          dest: './',
        },
      ],
    }),
    zipPack({
      inDir: 'dist',
      outDir: './release',
      outFileName: `DevTester-${pkg.version}.zip`,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.less'],
  },
  build: {
    // cssCodeSplit: false,
    minify: false,
    cssMinify: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: ['popup.html', 'login.html', 'setting.html'],
      output: {
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  server: {
    host: 'localhost',
    port: 8000,
  },
});
