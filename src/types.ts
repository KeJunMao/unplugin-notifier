import { RollupError } from 'rollup'
import type { StatsError } from 'webpack'
import type { Message } from 'esbuild'
import type { BundlerList } from './core/constant'

export type ErrorNotification = string | Error | StatsError | Message

export type BundlerName = typeof BundlerList[number]
export type IconName = BundlerName | 'logo'

export interface Options {
  cwd: string
  isNuxt: boolean
}

export interface UserOptions extends Partial<Options> { }
export interface ResolvedUserOptions extends Options { }
