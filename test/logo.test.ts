import { describe, it } from 'vitest'
import { isCI } from 'std-env'
import { Context } from '../src/core/context'
import { BundlerList } from '../src/core/constant'

describe.skip('logo', () => {
  const ctx = new Context()
  for (const bundler of BundlerList) {
    it(bundler, () => {
      if (!isCI) {
        ctx.options.isNuxt = bundler.includes('nuxt:')
        ctx.bundler = bundler
        ctx.error('unplugin-notifier')
      }
    })
  }
})
