const Unplugin = require('unplugin-notifier/webpack').default

/** @typedef {import('webpack').Configuration} WebpackConfig */
/** @type {WebpackConfig} */

const config = {
  entry: './main.ts',
  plugins: [Unplugin()],
}

module.exports = config
