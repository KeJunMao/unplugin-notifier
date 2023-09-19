import { defineConfig } from 'rollup'
import Unplugin from 'unplugin-notifier/rollup'

export default defineConfig({
  input: 'main.ts',
  plugins: [Unplugin()],
})
