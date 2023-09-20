const Unplugin = require('unplugin-notifier/webpack')

/** @typedef {import('webpack').Configuration} WebpackConfig */
/** @type {WebpackConfig} */

const config = {
  entry: './main.ts',
  plugins: [Unplugin()],
}

module.exports = config
