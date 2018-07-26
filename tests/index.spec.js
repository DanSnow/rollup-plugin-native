import {readdir as _readdir} from 'fs'
import native from '..'
import {promisify} from 'util'
import {resolve} from 'path'
import {rollup} from 'rollup'
import tmp from 'tmp-promise'

const readdir = promisify(_readdir)

const NATIVE_MODULE_REGEX = /native-.*\.node/

describe('rollup-plugin-native', () => {
  it('Copy native module & Rewrite import', async () => {
    await tmp.withDir(
      async ({path}) => {
        const bundle = await rollup({
          input: resolve(__dirname, '__fixtures__/index.js'),

          plugins: [
            native({
              exports: {
                [resolve(__dirname, '__fixtures__/native.node')]: ['foo']
              }
            })
          ]
        })
        const generated = await bundle.generate({
          dir: path,
          format: 'cjs',
          file: 'bundle.js'
        })
        const files = await readdir(path)
        const nativeModuleName = files.find(file =>
          NATIVE_MODULE_REGEX.test(file)
        )
        expect(nativeModuleName).toBeTruthy()
        expect(generated.code).toEqual(
          expect.stringContaining(
            `const {foo} = require('./${nativeModuleName}')`
          )
        )
      },
      {unsafeCleanup: true}
    )
  })
})
