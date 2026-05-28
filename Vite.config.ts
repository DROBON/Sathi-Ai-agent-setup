import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'সাথী - Personal AI Agent',
          short_name: 'Sathi',
          description: 'সাথী - আপনার পার্সোনাল এআই এজেন্ট এবং ডিজিটাল সল্যুশন।',
          theme_color: '#4F46E5',
          background_color: '#FDFDFF',
          display: 'standalone',
          icons: [
            {
              src: 'icon-512.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'icon-512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY_POOL': JSON.stringify(env.GEMINI_API_KEY_POOL || ''),
      'process.env.OPENAI_API_KEY': JSON.stringify(env.OPENAI_API_KEY || ''),
      'process.env.OPENAI_API_KEY_POOL': JSON.stringify(env.OPENAI_API_KEY_POOL || ''),
      'process.env.DEEPSEEK_API_KEY': JSON.stringify(env.DEEPSEEK_API_KEY || ''),
      'process.env.DEEPSEEK_API_KEY_POOL': JSON.stringify(env.DEEPSEEK_API_KEY_POOL || ''),
      'process.env': JSON.stringify({
        GEMINI_API_KEY: env.GEMINI_API_KEY,
        GEMINI_API_KEY_POOL: env.GEMINI_API_KEY_POOL || '',
        OPENAI_API_KEY: env.OPENAI_API_KEY || '',
        OPENAI_API_KEY_POOL: env.OPENAI_API_KEY_POOL || '',
        DEEPSEEK_API_KEY: env.DEEPSEEK_API_KEY || '',
        DEEPSEEK_API_KEY_POOL: env.DEEPSEEK_API_KEY_POOL || '',
        NODE_ENV: mode
      }),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});