import type { BundlerList } from './core/constant'

export type ErrorNotification = string | {
  message?: string
  text?: string
}

export type BundlerName = typeof BundlerList[number]
export type IconName = BundlerName | 'logo'

export interface Options {
  cwd: string
  isNuxt: boolean
}

export interface UserOptions extends Partial<Options> { }
export interface ResolvedUserOptions extends Options { }
