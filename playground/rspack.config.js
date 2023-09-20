const path = require('node:path')
const Unplugin = require('unplugin-notifier/rspack')

/** @typedef {import('@rspack/core').Configuration} RspackConfig */
/** @type {RspackConfig} */
const config = {
  entry: {
    main: './main.ts',
  },
  plugins: [Unplugin()],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
}

module.exports = config
