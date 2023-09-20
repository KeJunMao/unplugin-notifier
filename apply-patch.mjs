import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { applyPatchToDir } from '@pnpm/patching.apply-patch'

const _require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const moduleName = 'node-notifier'
const moduleVersion = '10.0.1'
function apply() {
  applyPatchToDir({
    patchedDir: dirname(_require.resolve(moduleName)),
    patchFilePath: join(__dirname, `patches/${moduleName}@${moduleVersion}.patch`),
  })

  // eslint-disable-next-line no-console
  console.log(`✔ Patched ${moduleName}@${moduleVersion}.`)
}

try {
  apply()
}
catch (error) {
  console.error(error)
  console.error(`Unrecognized patch file in patches directory ${moduleName}@${moduleVersion}.patch`)
}
