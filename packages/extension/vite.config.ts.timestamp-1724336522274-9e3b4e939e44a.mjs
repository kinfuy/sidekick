// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///D:/project/%E4%B8%AA%E4%BA%BA/%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91/sidekick/node_modules/.pnpm/vite@4.3.9_@types+node@18.16.3_less@4.1.3/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/project/%E4%B8%AA%E4%BA%BA/%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91/sidekick/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.3.9_vue@3.3.1/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { crx } from "file:///D:/project/%E4%B8%AA%E4%BA%BA/%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91/sidekick/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.18/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import tsconfigPaths from "file:///D:/project/%E4%B8%AA%E4%BA%BA/%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91/sidekick/node_modules/.pnpm/vite-tsconfig-paths@4.2.0_typescript@4.9.5_vite@4.3.9/node_modules/vite-tsconfig-paths/dist/index.mjs";
import vuejsx from "file:///D:/project/%E4%B8%AA%E4%BA%BA/%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91/sidekick/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.1_vite@4.3.9_vue@3.3.1/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { shadowDomCssPlugin } from "file:///D:/project/%E4%B8%AA%E4%BA%BA/%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91/sidekick/node_modules/.pnpm/vite-plugin-shadowcss@0.0.4/node_modules/vite-plugin-shadowcss/dist/es/index.mjs";
import AutoImport from "file:///D:/project/%E4%B8%AA%E4%BA%BA/%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91/sidekick/node_modules/.pnpm/unplugin-auto-import@0.17.6_@vueuse+core@10.9.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/project/%E4%B8%AA%E4%BA%BA/%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91/sidekick/node_modules/.pnpm/unplugin-vue-components@0.27.0_vue@3.3.1/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/project/%E4%B8%AA%E4%BA%BA/%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91/sidekick/node_modules/.pnpm/unplugin-vue-components@0.27.0_vue@3.3.1/node_modules/unplugin-vue-components/dist/resolvers.js";
import { viteStaticCopy } from "file:///D:/project/%E4%B8%AA%E4%BA%BA/%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91/sidekick/node_modules/.pnpm/vite-plugin-static-copy@1.0.6_vite@4.3.9/node_modules/vite-plugin-static-copy/dist/index.js";
import zipPack from "file:///D:/project/%E4%B8%AA%E4%BA%BA/%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91/sidekick/node_modules/.pnpm/vite-plugin-zip-pack@1.2.3_vite@4.3.9/node_modules/vite-plugin-zip-pack/dist/esm/index.mjs";

// manifest.config.ts
import { defineManifest } from "file:///D:/project/%E4%B8%AA%E4%BA%BA/%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91/sidekick/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.18/node_modules/@crxjs/vite-plugin/dist/index.mjs";
var isDev = process.env.NODE_ENV !== "production";
var manifest_config_default = defineManifest(() => {
  return {
    manifest_version: 3,
    name: "__MSG_chrome_extension_name__",
    version: "0.0.3",
    description: "__MSG_chrome_extension_description__",
    icons: {
      "16": "public/logo.png",
      "48": "public/logo.png",
      "128": "public/logo.png"
    },
    background: {
      service_worker: "src/background/index.ts",
      type: "module"
    },
    action: {
      default_icon: "public/logo.png",
      default_title: "DevTester",
      default_popup: "popup.html"
    },
    content_scripts: [
      {
        matches: ["<all_urls>"],
        js: ["src/content/index.ts"],
        run_at: "document_start"
      }
    ],
    permissions: [
      // 'contextMenus',
      // 'bookmarks',
      // 'webRequest',
      // 'notifications',
      "storage",
      "tabs",
      "alarms",
      "cookies",
      "activeTab"
    ],
    default_locale: "zh_CN",
    host_permissions: ["<all_urls>"],
    web_accessible_resources: isDev ? [] : [
      {
        matches: ["<all_urls>"],
        resources: ["assets/shadow-styles.css"],
        use_dynamic_url: true
      },
      {
        matches: ["<all_urls>"],
        resources: ["assets/web-notice.css"],
        use_dynamic_url: true
      },
      {
        matches: ["<all_urls>"],
        resources: ["assets/click-count.css"],
        use_dynamic_url: true
      }
    ]
  };
});

// package.json
var package_default = {
  name: "dev-tester",
  type: "module",
  version: "0.0.3",
  author: "kinfuy",
  license: "MIT",
  main: "index.js",
  scripts: {
    dev: "vite",
    build: "tsc && vite build"
  },
  dependencies: {
    "@vueuse/core": "^10.9.0",
    axios: "^1.6.8",
    "blueimp-md5": "^2.19.0",
    "canvas-confetti": "^1.9.3",
    dayjs: "^1.11.11",
    echarts: "^5.5.1",
    "element-plus": "^2.7.3",
    vue: "^3.3.1",
    "vue-echarts": "^6.7.3"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "2.0.0-beta.18",
    "@rollup/pluginutils": "^5.0.2",
    "@types/blueimp-md5": "^2.18.2",
    "@types/canvas-confetti": "1.6.4",
    "@types/node": "^18.15.9",
    "@vitejs/plugin-vue": "^4.2.0",
    "@vitejs/plugin-vue-jsx": "^3.0.1",
    "chrome-types": "^0.1.191",
    less: "^4.1.3",
    postcss: "^8.4.24",
    "postcss-html": "^1.5.0",
    "postcss-import": "^15.1.0",
    "postcss-less": "^6.0.0",
    "postcss-nesting": "^11.2.2",
    prettier: "^2.8.8",
    process: "^0.11.10",
    "unplugin-auto-import": "^0.17.6",
    "unplugin-vue-components": "^0.27.0",
    vite: "^4.2.0",
    "vite-plugin-shadowcss": "^0.0.4",
    "vite-plugin-shortcuts": "^0.1.0",
    "vite-plugin-static-copy": "^1.0.6",
    "vite-plugin-zip-pack": "^1.2.3",
    "vite-tsconfig-paths": "^4.2.0"
  }
};

// vite.config.ts
var isDev2 = process.env.NODE_ENV !== "production";
var vite_config_default = defineConfig({
  // esbuild: {
  //   drop: ['console', 'debugger'],
  // },
  define: {
    __DEV__: isDev2
  },
  plugins: [
    tsconfigPaths(),
    vue(),
    vuejsx(),
    crx({ manifest: manifest_config_default }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    shadowDomCssPlugin({
      alias: {
        "@": resolve("./src")
      },
      log: false,
      config: [
        {
          container: "#dev-tester-extension",
          output: "assets/shadow-styles.css",
          retry: 3
        },
        {
          key: "webnotice",
          container: "#web-notice",
          output: "assets/web-notice.css",
          retry: 10
        },
        {
          key: "clickCount",
          container: "#click-count",
          output: "assets/click-count.css",
          retry: 10
        }
      ]
    }),
    viteStaticCopy({
      silent: true,
      targets: [
        {
          src: "./src/_locales",
          dest: "./"
        }
      ]
    }),
    zipPack({
      inDir: "dist",
      outDir: "./release",
      outFileName: `DevTester-${package_default.version}.zip`
    })
  ],
  resolve: {
    alias: {
      "@": resolve("./src")
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".vue", ".less"]
  },
  build: {
    // cssCodeSplit: false,
    minify: false,
    cssMinify: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: ["popup.html", "login.html", "setting.html"],
      output: {
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  server: {
    host: "localhost",
    port: 8e3
  }
});
export {
  vite_config_default as default,
  isDev2 as isDev
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxcXHU0RTJBXHU0RUJBXFxcXFx1NjNEMlx1NEVGNlx1NUYwMFx1NTNEMVxcXFxzaWRla2lja1xcXFxwYWNrYWdlc1xcXFxleHRlbnNpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxcXHU0RTJBXHU0RUJBXFxcXFx1NjNEMlx1NEVGNlx1NUYwMFx1NTNEMVxcXFxzaWRla2lja1xcXFxwYWNrYWdlc1xcXFxleHRlbnNpb25cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Byb2plY3QvJUU0JUI4JUFBJUU0JUJBJUJBLyVFNiU4RiU5MiVFNCVCQiVCNiVFNSVCQyU4MCVFNSU4RiU5MS9zaWRla2ljay9wYWNrYWdlcy9leHRlbnNpb24vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB7IGNyeCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbic7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJztcbmltcG9ydCB2dWVqc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCc7XG5pbXBvcnQgeyBzaGFkb3dEb21Dc3NQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zaGFkb3djc3MnO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xuaW1wb3J0IHsgdml0ZVN0YXRpY0NvcHkgfSBmcm9tICd2aXRlLXBsdWdpbi1zdGF0aWMtY29weSc7XG5pbXBvcnQgemlwUGFjayBmcm9tICd2aXRlLXBsdWdpbi16aXAtcGFjayc7XG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5jb25maWcnO1xuaW1wb3J0IHBrZyBmcm9tICcuL3BhY2thZ2UuanNvbic7XG5leHBvcnQgY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgLy8gZXNidWlsZDoge1xuICAvLyAgIGRyb3A6IFsnY29uc29sZScsICdkZWJ1Z2dlciddLFxuICAvLyB9LFxuICBkZWZpbmU6IHtcbiAgICBfX0RFVl9fOiBpc0RldixcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHRzY29uZmlnUGF0aHMoKSxcbiAgICB2dWUoKSxcbiAgICB2dWVqc3goKSxcbiAgICBjcngoeyBtYW5pZmVzdCB9KSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgIH0pLFxuICAgIHNoYWRvd0RvbUNzc1BsdWdpbih7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHJlc29sdmUoJy4vc3JjJyksXG4gICAgICB9LFxuICAgICAgbG9nOiBmYWxzZSxcbiAgICAgIGNvbmZpZzogW1xuICAgICAgICB7XG4gICAgICAgICAgY29udGFpbmVyOiAnI2Rldi10ZXN0ZXItZXh0ZW5zaW9uJyxcbiAgICAgICAgICBvdXRwdXQ6ICdhc3NldHMvc2hhZG93LXN0eWxlcy5jc3MnLFxuICAgICAgICAgIHJldHJ5OiAzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAga2V5OiAnd2Vibm90aWNlJyxcbiAgICAgICAgICBjb250YWluZXI6ICcjd2ViLW5vdGljZScsXG4gICAgICAgICAgb3V0cHV0OiAnYXNzZXRzL3dlYi1ub3RpY2UuY3NzJyxcbiAgICAgICAgICByZXRyeTogMTAsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBrZXk6ICdjbGlja0NvdW50JyxcbiAgICAgICAgICBjb250YWluZXI6ICcjY2xpY2stY291bnQnLFxuICAgICAgICAgIG91dHB1dDogJ2Fzc2V0cy9jbGljay1jb3VudC5jc3MnLFxuICAgICAgICAgIHJldHJ5OiAxMCxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgc2lsZW50OiB0cnVlLFxuICAgICAgdGFyZ2V0czogW1xuICAgICAgICB7XG4gICAgICAgICAgc3JjOiAnLi9zcmMvX2xvY2FsZXMnLFxuICAgICAgICAgIGRlc3Q6ICcuLycsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICAgIHppcFBhY2soe1xuICAgICAgaW5EaXI6ICdkaXN0JyxcbiAgICAgIG91dERpcjogJy4vcmVsZWFzZScsXG4gICAgICBvdXRGaWxlTmFtZTogYERldlRlc3Rlci0ke3BrZy52ZXJzaW9ufS56aXBgLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcmVzb2x2ZSgnLi9zcmMnKSxcbiAgICB9LFxuICAgIGV4dGVuc2lvbnM6IFsnLmpzJywgJy5qc3gnLCAnLnRzJywgJy50c3gnLCAnLnZ1ZScsICcubGVzcyddLFxuICB9LFxuICBidWlsZDoge1xuICAgIC8vIGNzc0NvZGVTcGxpdDogZmFsc2UsXG4gICAgbWluaWZ5OiBmYWxzZSxcbiAgICBjc3NNaW5pZnk6IGZhbHNlLFxuICAgIGFzc2V0c0lubGluZUxpbWl0OiAwLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiBbJ3BvcHVwLmh0bWwnLCAnbG9naW4uaHRtbCcsICdzZXR0aW5nLmh0bWwnXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBhc3NldEZpbGVOYW1lczogYGFzc2V0cy9bbmFtZV0uW2V4dF1gLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICBwb3J0OiA4MDAwLFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxcXHU0RTJBXHU0RUJBXFxcXFx1NjNEMlx1NEVGNlx1NUYwMFx1NTNEMVxcXFxzaWRla2lja1xcXFxwYWNrYWdlc1xcXFxleHRlbnNpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxcXHU0RTJBXHU0RUJBXFxcXFx1NjNEMlx1NEVGNlx1NUYwMFx1NTNEMVxcXFxzaWRla2lja1xcXFxwYWNrYWdlc1xcXFxleHRlbnNpb25cXFxcbWFuaWZlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0LyVFNCVCOCVBQSVFNCVCQSVCQS8lRTYlOEYlOTIlRTQlQkIlQjYlRTUlQkMlODAlRTUlOEYlOTEvc2lkZWtpY2svcGFja2FnZXMvZXh0ZW5zaW9uL21hbmlmZXN0LmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZU1hbmlmZXN0IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJztcbmV4cG9ydCBjb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZU1hbmlmZXN0KCgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBtYW5pZmVzdF92ZXJzaW9uOiAzLFxuICAgIG5hbWU6ICdfX01TR19jaHJvbWVfZXh0ZW5zaW9uX25hbWVfXycsXG4gICAgdmVyc2lvbjogJzAuMC4zJyxcbiAgICBkZXNjcmlwdGlvbjogJ19fTVNHX2Nocm9tZV9leHRlbnNpb25fZGVzY3JpcHRpb25fXycsXG4gICAgaWNvbnM6IHtcbiAgICAgICcxNic6ICdwdWJsaWMvbG9nby5wbmcnLFxuICAgICAgJzQ4JzogJ3B1YmxpYy9sb2dvLnBuZycsXG4gICAgICAnMTI4JzogJ3B1YmxpYy9sb2dvLnBuZycsXG4gICAgfSxcbiAgICBiYWNrZ3JvdW5kOiB7XG4gICAgICBzZXJ2aWNlX3dvcmtlcjogJ3NyYy9iYWNrZ3JvdW5kL2luZGV4LnRzJyxcbiAgICAgIHR5cGU6ICdtb2R1bGUnLFxuICAgIH0sXG4gICAgYWN0aW9uOiB7XG4gICAgICBkZWZhdWx0X2ljb246ICdwdWJsaWMvbG9nby5wbmcnLFxuICAgICAgZGVmYXVsdF90aXRsZTogJ0RldlRlc3RlcicsXG4gICAgICBkZWZhdWx0X3BvcHVwOiAncG9wdXAuaHRtbCcsXG4gICAgfSxcbiAgICBjb250ZW50X3NjcmlwdHM6IFtcbiAgICAgIHtcbiAgICAgICAgbWF0Y2hlczogWyc8YWxsX3VybHM+J10sXG4gICAgICAgIGpzOiBbJ3NyYy9jb250ZW50L2luZGV4LnRzJ10sXG4gICAgICAgIHJ1bl9hdDogJ2RvY3VtZW50X3N0YXJ0JyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBwZXJtaXNzaW9uczogW1xuICAgICAgLy8gJ2NvbnRleHRNZW51cycsXG4gICAgICAvLyAnYm9va21hcmtzJyxcbiAgICAgIC8vICd3ZWJSZXF1ZXN0JyxcbiAgICAgIC8vICdub3RpZmljYXRpb25zJyxcbiAgICAgICdzdG9yYWdlJyxcbiAgICAgICd0YWJzJyxcbiAgICAgICdhbGFybXMnLFxuICAgICAgJ2Nvb2tpZXMnLFxuICAgICAgJ2FjdGl2ZVRhYicsXG4gICAgXSxcbiAgICBkZWZhdWx0X2xvY2FsZTogJ3poX0NOJyxcbiAgICBob3N0X3Blcm1pc3Npb25zOiBbJzxhbGxfdXJscz4nXSxcbiAgICB3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXM6IGlzRGV2XG4gICAgICA/IFtdXG4gICAgICA6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtYXRjaGVzOiBbJzxhbGxfdXJscz4nXSxcbiAgICAgICAgICAgIHJlc291cmNlczogWydhc3NldHMvc2hhZG93LXN0eWxlcy5jc3MnXSxcbiAgICAgICAgICAgIHVzZV9keW5hbWljX3VybDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1hdGNoZXM6IFsnPGFsbF91cmxzPiddLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbJ2Fzc2V0cy93ZWItbm90aWNlLmNzcyddLFxuICAgICAgICAgICAgdXNlX2R5bmFtaWNfdXJsOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWF0Y2hlczogWyc8YWxsX3VybHM+J10sXG4gICAgICAgICAgICByZXNvdXJjZXM6IFsnYXNzZXRzL2NsaWNrLWNvdW50LmNzcyddLFxuICAgICAgICAgICAgdXNlX2R5bmFtaWNfdXJsOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gIH07XG59KTtcbiIsICJ7XG4gIFwibmFtZVwiOiBcImRldi10ZXN0ZXJcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4zXCIsXG4gIFwiYXV0aG9yXCI6IFwia2luZnV5XCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcIm1haW5cIjogXCJpbmRleC5qc1wiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxuICAgIFwiYnVpbGRcIjogXCJ0c2MgJiYgdml0ZSBidWlsZFwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMC45LjBcIixcbiAgICBcImF4aW9zXCI6IFwiXjEuNi44XCIsXG4gICAgXCJibHVlaW1wLW1kNVwiOiBcIl4yLjE5LjBcIixcbiAgICBcImNhbnZhcy1jb25mZXR0aVwiOiBcIl4xLjkuM1wiLFxuICAgIFwiZGF5anNcIjogXCJeMS4xMS4xMVwiLFxuICAgIFwiZWNoYXJ0c1wiOiBcIl41LjUuMVwiLFxuICAgIFwiZWxlbWVudC1wbHVzXCI6IFwiXjIuNy4zXCIsXG4gICAgXCJ2dWVcIjogXCJeMy4zLjFcIixcbiAgICBcInZ1ZS1lY2hhcnRzXCI6IFwiXjYuNy4zXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI6IFwiMi4wLjAtYmV0YS4xOFwiLFxuICAgIFwiQHJvbGx1cC9wbHVnaW51dGlsc1wiOiBcIl41LjAuMlwiLFxuICAgIFwiQHR5cGVzL2JsdWVpbXAtbWQ1XCI6IFwiXjIuMTguMlwiLFxuICAgIFwiQHR5cGVzL2NhbnZhcy1jb25mZXR0aVwiOiBcIjEuNi40XCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4xOC4xNS45XCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNC4yLjBcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjogXCJeMy4wLjFcIixcbiAgICBcImNocm9tZS10eXBlc1wiOiBcIl4wLjEuMTkxXCIsXG4gICAgXCJsZXNzXCI6IFwiXjQuMS4zXCIsXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4yNFwiLFxuICAgIFwicG9zdGNzcy1odG1sXCI6IFwiXjEuNS4wXCIsXG4gICAgXCJwb3N0Y3NzLWltcG9ydFwiOiBcIl4xNS4xLjBcIixcbiAgICBcInBvc3Rjc3MtbGVzc1wiOiBcIl42LjAuMFwiLFxuICAgIFwicG9zdGNzcy1uZXN0aW5nXCI6IFwiXjExLjIuMlwiLFxuICAgIFwicHJldHRpZXJcIjogXCJeMi44LjhcIixcbiAgICBcInByb2Nlc3NcIjogXCJeMC4xMS4xMFwiLFxuICAgIFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMC4xNy42XCIsXG4gICAgXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50c1wiOiBcIl4wLjI3LjBcIixcbiAgICBcInZpdGVcIjogXCJeNC4yLjBcIixcbiAgICBcInZpdGUtcGx1Z2luLXNoYWRvd2Nzc1wiOiBcIl4wLjAuNFwiLFxuICAgIFwidml0ZS1wbHVnaW4tc2hvcnRjdXRzXCI6IFwiXjAuMS4wXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1zdGF0aWMtY29weVwiOiBcIl4xLjAuNlwiLFxuICAgIFwidml0ZS1wbHVnaW4temlwLXBhY2tcIjogXCJeMS4yLjNcIixcbiAgICBcInZpdGUtdHNjb25maWctcGF0aHNcIjogXCJeNC4yLjBcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBYLFNBQVMsZUFBZTtBQUNsWixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsU0FBUyxXQUFXO0FBQ3BCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sWUFBWTtBQUNuQixTQUFTLDBCQUEwQjtBQUNuQyxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUNwQyxTQUFTLHNCQUFzQjtBQUMvQixPQUFPLGFBQWE7OztBQ1g4VyxTQUFTLHNCQUFzQjtBQUMxWixJQUFNLFFBQVEsUUFBUSxJQUFJLGFBQWE7QUFFOUMsSUFBTywwQkFBUSxlQUFlLE1BQU07QUFDbEMsU0FBTztBQUFBLElBQ0wsa0JBQWtCO0FBQUEsSUFDbEIsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsT0FBTztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04s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
