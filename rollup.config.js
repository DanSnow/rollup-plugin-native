import prettier from 'rollup-plugin-prettier'

export default {
  input: 'index.js',
  output: {
    file: 'dist/rollup-plugin-native.js',
    format: 'cjs'
  },
  external: ['path', 'fs', 'crypto', 'util'],
  plugins: [
    prettier({
      parser: 'babylon',
      tabWidth: 2,
      singleQuote: true,
      semi: false
    })
  ]
}
