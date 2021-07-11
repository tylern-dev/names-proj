import { join } from 'path'
import StartServerPlugin from 'start-server-webpack-plugin'
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'

const isProd = process.env.NODE_ENV === 'production'
const rootDir = process.cwd()

export default {
  devtool: 'eval',
  target: 'node',
  watch: !isProd,
  entry: ['babel-polyfill', ...(!isProd ? ['webpack/hot/poll?1000'] : []), join(rootDir, 'server/index.js')],
  output: {
    path: !isProd ? join(rootDir, '.build') : join(rootDir, 'dist'),
    filename: 'server.js',
  },
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?1000'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    ...(!isProd
      ? [
          new StartServerPlugin('server.js'),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NamedModulesPlugin(),
          new webpack.NoEmitOnErrorsPlugin(),
        ]
      : [new webpack.HashedModuleIdsPlugin()]),
  ],
}
