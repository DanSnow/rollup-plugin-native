interface NativePluginOptions {
  exports: {[k: string]: string[]}
}

interface NativePlugin {
  name: 'native'
  load(id: string): null | string | Promise<string>
  generateBundle(options: object): Promise<void>
}

export default function native(options: NativePluginOptions): NativePlugin
