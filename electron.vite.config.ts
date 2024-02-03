import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src'),
                '@': resolve('src'),
                '~': resolve('src/renderer/src/store')
            }
        },
        plugins: [
            react(),
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [resolve(process.cwd(), 'src/renderer/src/assets/svg')],
                // 指定symbolId格式
                symbolId: 'icon-[dir]-[name]'
            })
        ],
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnable: true
                }
            }
        },
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost',
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        }
    }
})
