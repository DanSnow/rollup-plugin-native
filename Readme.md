rollup-plugin-native
====================

Allow to load native modules in node environment

Usage
-----

```javascript
import {resolve} from 'path'
import native from 'rollup-plugin-native'

export default {
  input: './index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    native({
      // Module exports map. **required**
      exports: {
        [resolve(__dirname, 'path/to/native.node')]: ['foo']
      }
    })
  ]
}
```

Output will like:

```plain
- bundle.js
- native-<hash>.node
```
