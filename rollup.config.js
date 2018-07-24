import prettier from 'rollup-plugin-prettier'
import sucrase from 'rollup-plugin-sucrase'

export default {
  input: 'index.js',
  output: {
    file: 'dist/rollup-plugin-native.js',
    format: 'cjs'
  },
  external: ['path', 'fs', 'crypto', 'util'],
  plugins: [
    sucrase({transforms: ['imports']}),
    prettier({
      parser: 'babylon',
      tabWidth: 2,
      singleQuote: true,
      semi: false
    })
  ]
}
