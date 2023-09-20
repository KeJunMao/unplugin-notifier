import process from 'node:process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import nn from 'node-notifier'
import { isTest } from 'std-env'
import type {
  BundlerName,
  ErrorNotification,
  ResolvedUserOptions,
  UserOptions,
} from '../types'
import { pluginName } from './constant'

function resolveOptions(options: UserOptions = {}): ResolvedUserOptions {
  return {
    cwd: process.cwd(),
    isNuxt: false,
    ...options,
  }
}

export class Context {
  cwd: string
  private _bundler: BundlerName = 'esbuild'

  options: ResolvedUserOptions
  constructor(options: UserOptions = {}) {
    this.cwd = options.cwd ?? process.cwd()
    this.options = resolveOptions(options)
  }

  public get bundler(): BundlerName {
    return this._bundler
  }

  public set bundler(value: BundlerName) {
    this._bundler = this.options.isNuxt ? `nuxt:${value.replace('nuxt:', '')}` as BundlerName : value
  }

  get dirname() {
    let dirname = ''
    try {
      if (__dirname)
        dirname = __dirname
    }
    catch (_error) {
      try {
        if (import.meta.url)
          dirname = path.dirname(fileURLToPath(import.meta.url))
        else
          throw new Error('import.meta.url is undefined')
      }
      catch (error) {
        dirname = path.join(this.cwd, `node_modules/${pluginName}/dist`)
      }
    }

    return dirname
  }

  get title() {
    const firstUpperCase = (str: string) => str.replace(/^(\w)(.*?)$/, (_, g1, g2) => `${g1.toUpperCase()}${g2}`)
    let title = firstUpperCase(this.bundler)
    if (this.bundler === 'esbuild')
      title = 'esbuild'
    if (this.options.isNuxt) {
      const [nuxt, bundler] = title.split(':')
      title = `${firstUpperCase(bundler)} Based ${nuxt}`
    }

    return title
  }

  get icon() {
    const filename = (this.options.isNuxt ? 'nuxt' : this.bundler) ?? 'logo'
    const filepath = path.join(this.dirname, isTest ? `../../assets/${filename}.png` : `../assets/${filename}.png`)

    return filepath
  }

  formatErrorMessage(error?: ErrorNotification) {
    if (!error)
      return
    let message = ''
    if (typeof error === 'string')
      message = error
    else if ('message' in error && error.message)
      message = error.message
    else if ('text' in error && error.text)
      message = error.text

    return message
  }

  notify(...args: Parameters<typeof nn.notify>) {
    const [notification, callback] = args
    const options = typeof notification === 'string'
      ? {
          message: notification,
        }
      : notification

    if (typeof options?.message === 'string')
      options.message = options.message.substring(0, 256)

    return nn.notify({
      appID: pluginName,
      icon: this.icon,
      ...options,
    }, callback)
  }

  error(error?: ErrorNotification) {
    this.notify({
      title: `${this.title}`,
      message: this.formatErrorMessage(error),
    })
  }
}
