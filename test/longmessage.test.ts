import { describe, expect, it, vi } from 'vitest'
import nn from 'node-notifier'
import { normalizePath } from 'vite'
import { Context } from '../src/core/context'

describe('context', () => {
  it('very long message', () => {
    const ctx = new Context()
    ctx.notify('A'.repeat(100000))
  })
})
