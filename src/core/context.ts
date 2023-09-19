import process from 'node:process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import nn from 'node-notifier'
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

  get icon() {
    let dirname = ''
    try {
      if (__dirname)
        dirname = __dirname
    }
    catch (_error) {
      if (import.meta.url)
        dirname = path.dirname(fileURLToPath('import.meta.url'))
      else
        dirname = path.join(this.cwd, `node_modules/${pluginName}/dist`)
    }

    const filename = this.options.icon ?? this.bundler?.toLowerCase() ?? 'logo'
    const filepath = path.join(dirname, `../assets/${filename}.svg`)

    return filepath
  }

  notify(...args: Parameters<typeof nn.notify>) {
    const [notification, callback] = args
    const options = typeof notification === 'string'
      ? {
          message: notification,
        }
      : notification
    console.error()
    return nn.notify({
      title: this.title,
      appID: `${pluginName}:${this.bundler}`,
      icon: this.icon,
      ...options,
    }, callback)
  }

  error(message?: ErrorNotification) {
    this.notify({
      message: typeof message === 'string' ? message : message?.message ?? message?.text,
    })
  }
}
