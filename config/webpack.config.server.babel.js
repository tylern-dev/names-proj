// const path = require('path')
import path from 'path'
// const nodeExternals = require('webpack-node-externals')
import nodeExternals from 'webpack-node-externals'
import webpack from 'webpack'
import Dotenv from 'dotenv-webpack'
// const webpack = require('webpack')
import StartServerPlugin from 'razzle-start-server-webpack-plugin'

const isProd = process.env.NODE_ENV === 'production'
const rootDir = process.cwd()

export default {
  watch: !isProd && true,
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    // ...(!isProd ? ['webpack/hot/poll?1000'] : []),
    path.join(rootDir, 'server/index.js'),
  ],
  output: {
    path: !isProd ? path.join(rootDir, '.build') : path.join(rootDir, 'dist'),
    filename: 'server.js',
  },

  target: 'node',
  externals: [
    // nodeExternals({
    //   allowlist: ['webpack/hot/poll?1000'],
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,

        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new Dotenv(),
    ...(!isProd
      ? [
          new StartServerPlugin({
            verbose: true,
            // print plugin/server errors
            debug: false,
            // name of the entry to run, defaults to 'main'
            // entryName: 'server.js',
          }),
          new webpack.HotModuleReplacementPlugin(),
          // new webpack.NamedModulesPlugin(),
          new webpack.NoEmitOnErrorsPlugin(),
        ]
      : [new webpack.HashedModuleIdsPlugin()]),
  ],
  devServer: {
    contentBase: path.join(__dirname, '.build'),
    compress: true,
    port: 9000,
  },
}
