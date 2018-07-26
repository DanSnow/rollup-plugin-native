import {readFile as _readFile, writeFile as _writeFile} from 'fs'
import {dirname, extname, join} from 'path'

import {createHash} from 'crypto'
import {promisify} from 'util'

const readFile = promisify(_readFile)
const writeFile = promisify(_writeFile)

export default function native ({exports} = {}) {
  const nativeModules = new Map()

  if (exports != null && typeof exports !== 'object') {
    throw new Error('exports should be an object')
  }

  return {
    name: 'native',

    load (id) {
      if (!Reflect.has(exports, id)) {
        return null
      }

      if (nativeModules.has(id)) {
        return nativeModules.get(id).code
      }

      return readFile(id).then(content => {
        const hash = createHash('sha1')
          .update(content)
          .digest('hex')
          .substring(0, 16)
        const filename = `native-${hash}${extname(id)}`
        const names = `{${exports[id].join(', ')}}`
        const code = `const ${names} = require('./${filename}')\nexport ${names}`
        nativeModules.set(id, {filename, content, code})
        return code
      })
    },

    generateBundle (options) {
      const base = options.dir || dirname(options.file)
      const promise = Promise.all(
        Array.from(nativeModules.values()).map(({filename, content}) =>
          writeFile(join(base, filename), content)
        )
      )
      nativeModules.clear()
      return promise
    }
  }
}
