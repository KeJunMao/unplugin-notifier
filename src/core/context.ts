import process from 'node:process'
import path, { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync, readFileSync } from 'node:fs'
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
  displayBundlerName: string
  projectName?: string

  options: ResolvedUserOptions
  constructor(options: UserOptions = {}) {
    this.cwd = options.cwd ?? process.cwd()
    this.options = resolveOptions(options)

    this.displayBundlerName = this.getDisplayBundlerName()
    this.projectName = this.getProjectName()
  }

  getProjectName() {
    const projectPackageJsonPath = join(this.cwd, 'package.json')
    if (existsSync(projectPackageJsonPath)) {
      const packageJson = readFileSync(projectPackageJsonPath, 'utf8')
      try {
        const packageJsonData = JSON.parse(packageJson)
        return ((packageJsonData.displayName ?? packageJsonData.name) as string)
      }
      catch (_error) {}
    }
  }

  getDisplayBundlerName() {
    const firstUpperCase = (str: string) => str.replace(/^(\w)(.*?)$/, (_, g1, g2) => `${g1.toUpperCase()}${g2}`)
    let name = firstUpperCase(this.bundler)
    if (this.bundler === 'esbuild')
      name = 'esbuild'
    if (this.options.isNuxt) {
      const [nuxt, bundler] = name.split(':')
      name = `${firstUpperCase(bundler)} Based ${nuxt}`
    }

    return name
  }

  public get bundler(): BundlerName {
    return this._bundler
  }

  public set bundler(value: BundlerName) {
    this._bundler = this.options.isNuxt ? `nuxt:${value.replace('nuxt:', '')}` as BundlerName : value
    this.displayBundlerName = this.getDisplayBundlerName()
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
    if (this.projectName)
      return this.projectName

    return this.displayBundlerName
  }

  get icon() {
    const filename = (this.options.isNuxt ? 'nuxt' : this.bundler)
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
      title: `${this.title} - Error`,
      message: this.formatErrorMessage(error),
    })
  }
}
