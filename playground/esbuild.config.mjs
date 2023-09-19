import * as esbuild from 'esbuild'
import Unplugin from 'unplugin-notifier/esbuild'

try {
  await esbuild.build({
    entryPoints: ['main.ts'],
    bundle: true,
    plugins: [
      Unplugin(),
    ],
    outfile: 'dist/out.js',
  })
}
catch (error) {

}
