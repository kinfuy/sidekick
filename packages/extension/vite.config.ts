import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { crx } from '@crxjs/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import { shortcutsPlugin } from 'vite-plugin-shortcuts';
import vuejsx from '@vitejs/plugin-vue-jsx';
import { shadowDomCssPlugin } from 'vite-plugin-shadowcss';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import manifest from './manifest.config';

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
      log: true,
      config: [
        {
          container: '#sidekick-extension',
          output: 'assets/shadow-styles.css',
          retry: 3,
        },
        {
          key: 'webnotice',
          container: '#web-notice',
          output: 'assets/web-notice.css',
          retry: 10,
        },
      ],
    }),
    shortcutsPlugin({ defaults: ['s'] }),
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
    proxy: {
      // '/api': {
      //   target: 'http://server.kinfuy.cn:9000',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      // },
      '/api': {
        target: 'http://localhost:9000',
        rewrite: (path) => {
          const p = path.replace(/^\/api/, '');
          console.log(p);
          return p;
        },
        changeOrigin: true,
      },
    },
  },
});
