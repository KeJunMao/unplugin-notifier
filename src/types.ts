import type { BundlerList } from './core/constant'

export type BundlerName = typeof BundlerList[number]
export type IconName = BundlerName | 'logo'

export interface Options {
  cwd: string
  icon: IconName
}

export interface UserOptions extends Partial<Options> { }
