import process from 'node:process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import nn from 'node-notifier'
import { isLinux, isTest, isWindows } from 'std-env'
import type {
  BundlerName,
  UserOptions,
} from '../types'
import { pluginName } from './constant'

type ErrorNotification = string | {
  message?: string
  text?: string
}

export class Context {
  cwd: string
  bundler?: BundlerName
  options: UserOptions
  constructor(options: UserOptions = {}) {
    this.cwd = options.cwd ?? process.cwd()
    this.options = options
  }

  get title() {
    return this.bundler ?? pluginName
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

    const filename = this.options.icon ?? this.bundler?.toLowerCase() ?? 'logo'
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
