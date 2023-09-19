import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from 'unplugin-notifier/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin(),
  ],
})
