import process from 'node:process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import nn from 'node-notifier'
import { isLinux, isTest, isWindows } from 'std-env'
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

  get contentImage() {
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

    const filename = (this.options.isNuxt ? 'nuxt' : this.bundler) ?? 'logo'
    const filepath = path.join(dirname, isTest ? `../../assets/${filename}.png` : `../assets/${filename}.png`)

    return filepath
  }

  notify(...args: Parameters<typeof nn.notify>) {
    const [notification, callback] = args
    const options = typeof notification === 'string'
      ? {
          message: notification,
        }
      : notification
    const icon = isWindows || isLinux ? this.contentImage : undefined
    return nn.notify({
      // @ts-expect-error ignore
      appID: pluginName,
      icon,
      contentImage: this.contentImage,
      ...options,
    }, callback)
  }

  error(message?: ErrorNotification) {
    this.notify({
      title: `${this.title}`,
      message: typeof message === 'string' ? message : message?.message ?? message?.text,
    })
  }
}
