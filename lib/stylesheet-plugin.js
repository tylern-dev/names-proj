export default class StylesheetPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('StylesheetPlugin', this.handleEmit)
  }

  handleEmit = (compilation) => {
    const main = compilation.entrypoints.get('main')
    const filename = main.runtimeChunk.files.find((file) => /\.css$/.test(file))
    const data = `export STYLESHEET_FILENAME=${filename}`

    compilation.assets['.stylesheet'] = {
      source: () => data,
      size: () => data.length,
    }
  }
}
