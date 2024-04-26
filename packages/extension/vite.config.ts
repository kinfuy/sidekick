import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { crx } from '@crxjs/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import { shortcutsPlugin } from 'vite-plugin-shortcuts';
import vuejsx from '@vitejs/plugin-vue-jsx';
import { shadowDomCssPlugin } from 'vite-plugin-shadowcss';
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
    shadowDomCssPlugin({
      alias: {
        '@': resolve('./src'),
      },
      config: [
        {
          container: '#sidekick-extension',
          output: 'assets/shadow-styles.css',
        },
        {
          key: 'webnotice',
          container: '#web-notice',
          output: 'assets/web-notice.css',
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
      // input: ['newtab.html', 'option.html', 'popup.html'],
      // output: {
      //   assetFileNames: `assets/[name].[ext]`,
      // },
    },
  },
  server: {
    port: 8000,
  },
});
