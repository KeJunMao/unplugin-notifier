import { describe, it } from 'vitest'
import { isCI } from 'std-env'
import { Context } from '../src/core/context'

describe('context', () => {
  it('very long message', () => {
    if (!isCI)
      return
    const ctx = new Context()
    ctx.error('A'.repeat(100000))
  })
})
