import { describe, expect, it, vi } from 'vitest'
import nn from 'node-notifier'
import { normalizePath } from 'vite'
import { Context } from '../src/core/context'

vi.mock('node-notifier', () => {
  const nn = vi.fn()

  // @ts-expect-error ignore
  nn.notify = vi.fn()
  return {
    default: nn,
    notify: vi.fn(),
  }
})

describe('context', () => {
  it('base notification', () => {
    const ctx = new Context()
    ctx.notify('base')
    expect(nn.notify).toBeCalled()
  })

  it('error notification', () => {
    const ctx = new Context()
    ctx.error('error')
    expect(nn.notify).toBeCalled()
  })
  it('nuxt icon', () => {
    const ctx = new Context({
      isNuxt: true,
    })
    expect(normalizePath(ctx.icon)).includes('assets/nuxt.png')
  })
})
