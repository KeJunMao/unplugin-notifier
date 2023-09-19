import { addVitePlugin, addWebpackPlugin, defineNuxtModule } from '@nuxt/kit'
import vite from './vite'
import webpack from './webpack'
import type { UserOptions } from './types'
import '@nuxt/schema'
import { pluginName } from './core/constant'

export interface ModuleOptions extends UserOptions {

}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: `nuxt-${pluginName}`,
    configKey: 'unpluginManifest',
  },
  defaults: {
    icon: 'nuxt',
  },
  setup(options, _nuxt) {
    addVitePlugin(() => vite(options))
    addWebpackPlugin(() => webpack(options))
  },
})
