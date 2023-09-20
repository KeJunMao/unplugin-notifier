import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { applyPatchToDir } from '@pnpm/patching.apply-patch'

const __dirname = dirname(fileURLToPath(import.meta.url))
const moduleName = 'node-notifier'
const moduleVersion = '10.0.1'

try {
  applyPatchToDir({
    patchedDir: join(__dirname, `node_modules/${moduleName}`),
    patchFilePath: join(__dirname, `patches/${moduleName}@${moduleVersion}.patch`),
  })

  // eslint-disable-next-line no-console
  console.log(`✔ Patched ${moduleName}@${moduleVersion}.`)
}
catch (error) {
  console.error(`Unrecognized patch file in patches directory ${moduleName}@${moduleVersion}.patch`)
}
