import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dotenv from 'dotenv'

export default defineConfig(({ mode }) => {
    let proxy = undefined
    const serverEnv = dotenv.config({ path: resolve(__dirname, '../../.env') }).parsed
    const serverHost = serverEnv?.['HOST'] ?? 'localhost'
    const serverPort = serverEnv?.['PORT'] ?? 3000

    if (serverPort) {
        proxy = {
            '^/api/.*': {
                target: `http://${serverHost}:${serverPort}`,
                changeOrigin: true
            }
        }
    }

    return {
        plugins: [react()],
        resolve: {
            alias: {
                '@': resolve(__dirname, './src')
            }
        },
        build: {
            outDir: './build'
        },
        server: {
            open: true,
            proxy,
            port: process.env.VITE_PORT ?? 8080,
            host: process.env.VITE_HOST
        }
    }
})
