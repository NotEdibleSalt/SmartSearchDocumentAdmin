import { fileURLToPath, URL } from 'node:url'

import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'



// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {

  const env = loadEnv(mode, process.cwd());
  return {

    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT),
      open: true, // 运行是否自动打开浏览器
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp("^" + env.VITE_APP_BASE_API), "")
        }
      },
      hmr: true,
      watch: {
        usePolling: true
      }
    },
  }
})
