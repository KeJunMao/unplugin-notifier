<img src="rawAssets/logo.svg" alt="logo" width="100" height="100" align="right" />

# unplugin-notifier

Send native notifications when an error occurs in a bundler build, Powered by [unplugin](https://github.com/KeJunMao/unplugin-compression) and [node-notifier](https://github.com/mikaelbr/node-notifier/).

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![License][license-src]][license-href]
[![JSDocs][jsdocs-src]][jsdocs-href]

English | [简体中文](./README.zh-cn.md)

## Preview

<details>
<summary>Windows</summary><br>

![Windows Preview](screenshot/windows.png)

<br></details>

<details>
<summary>MacOS</summary><br>

![MacOS Preview](screenshot/macos.png)

<br></details>

<details>
<summary>Linux</summary><br>

![Linux Preview](screenshot/linux.png)

<br></details>

## Install

```bash
npm i unplugin-notifier
```

Check the `node-notifier` [requirements](https://github.com/mikaelbr/node-notifier#requirements) whether you need to install any additional tools for your OS.

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Notifier from 'unplugin-notifier/vite'

export default defineConfig({
  plugins: [
    Notifier({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Notifier from 'unplugin-notifier/rollup'

export default {
  plugins: [
    Notifier({ /* options */ }),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-notifier/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    ['unplugin-notifier/nuxt', { /* options */ }],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-notifier/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Notifier from 'unplugin-notifier/esbuild'

build({
  plugins: [Notifier()],
})
```

<br></details>

<details>
<summary>Rspack (⚠️ experimental)</summary><br>

```ts
// rspack.config.js
module.exports = {
  plugins: [
    require('unplugin-notifier/rspack')({ /* options */ }),
  ],
}
```
<br></details>

[npm-version-src]: https://img.shields.io/npm/v/unplugin-notifier?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/unplugin-notifier
[npm-downloads-src]: https://img.shields.io/npm/dm/unplugin-notifier?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/unplugin-notifier
[bundle-src]: https://img.shields.io/bundlephobia/minzip/unplugin-notifier?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=unplugin-notifier
[license-src]: https://img.shields.io/github/license/kejunmao/unplugin-notifier.svg?style=flat&colorA=18181B&colorB=F0DB4F
[license-href]: https://github.com/kejunmao/unplugin-notifier/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-18181B?style=flat&colorA=18181B&colorB=F0DB4F
[jsdocs-href]: https://www.jsdocs.io/package/unplugin-notifier
