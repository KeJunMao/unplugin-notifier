import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { UserOptions } from '../types'
import { Context } from './context'
import { pluginName } from './constant'

export const unpluginFactory: UnpluginFactory<UserOptions | undefined> = (
  options,
) => {
  const ctx = new Context(options)
  return {
    name: pluginName,
    enforce: 'pre',
    esbuild: {
      setup(build) {
        ctx.bundler = 'esbuild'
        build.onEnd((result) => {
          const error = result.errors[0]
          ctx.error(error)
        })
      },
    },
    rollup: {
      buildStart() {
        ctx.bundler = 'rollup'
      },
      buildEnd(error) {
        if (error)
          ctx.error(error)
      },
    },
    rspack(compiler) {
      ctx.bundler = 'rspack'

      compiler.hooks.done.tap(pluginName, (stats) => {
        if (stats.hasErrors()) {
          const info = stats.toJson()
          const error = info.errors?.[0]
          ctx.error(error)
        }
      })
    },
    vite: {
      buildStart() {
        ctx.bundler = 'vite'
      },
      configResolved(config) {
        const error = config.logger.error
        config.logger.error = (...args) => {
          error(...args)
          ctx.error(args[0])
        }
      },
    },
    webpack(compiler) {
      ctx.bundler = 'webpack'
      compiler.hooks.done.tap(pluginName, (stats) => {
        if (stats.hasErrors()) {
          const info = stats.toJson()
          const error = info.errors?.[0]
          ctx.error(error)
        }
      })
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
