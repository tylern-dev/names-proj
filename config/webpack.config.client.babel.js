// const webpack = require('webpack')
import webpack from 'webpack'
// const HtmlWebPackPlugin = require('html-webpack-plugin')
import HtmlWebpackPlugin from 'html-webpack-plugin'
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

// const path = require('path')
import path from 'path'

const { NODE_ENV } = process.env

const isProd = process.env.NODE_ENV === 'production'
const rootDir = process.cwd()

module.exports = {
  mode: NODE_ENV,
  devtool: 'source-map',
  entry: path.join(rootDir, 'client/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: !isProd ? path.join(rootDir, '.build') : path.join(rootDir, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),

    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/index.html',
    }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    historyApiFallback: true,
    hot: true,
    port: '5000',
  },
}
