import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: isGithubPages ? "/frontend-challenge/#" : "/",
})