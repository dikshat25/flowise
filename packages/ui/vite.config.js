import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig(() => {
    let proxy = undefined

    const serverHost = process.env.HOST ?? 'localhost'
    const serverPort = process.env.PORT ?? 3000

    if (process.env.NODE_ENV === 'development') {
        proxy = {
            '^/api': {
                target: `http://${serverHost}:${serverPort}`,
                changeOrigin: true
            }
        }
    }

    return {
        plugins: [react()],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                '@ui': resolve(__dirname, 'src/ui'),
                '@assets': resolve(__dirname, 'src/assets'),
                '@hooks': resolve(__dirname, 'src/hooks'),
                '@utils': resolve(__dirname, 'src/utils'),
                '@ui-components': resolve(__dirname, 'src/ui-component'),
                '@views': resolve(__dirname, 'src/views'),
                '@store': resolve(__dirname, 'src/store'),
                '@routes': resolve(__dirname, 'src/routes')
            }
        },
        build: {
            outDir: './build'
        },
        server: {
            open: true,
            proxy,
            port: Number(process.env.VITE_PORT ?? 8080),
            host: process.env.VITE_HOST
        }
    }
})
