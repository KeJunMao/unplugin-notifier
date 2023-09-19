import { describe, it } from 'vitest'
import { isCI } from 'std-env'
import { Context } from '../src/core/context'

describe('context', () => {
  const ctx = new Context()
  it('logo', () => {
    if (!isCI) {
      ctx.bundler = 'rspack'
      ctx.error('logo test')
    }
  })
})
