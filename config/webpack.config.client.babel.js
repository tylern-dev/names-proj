import { join } from 'path'
import webpack from 'webpack'
import S3Plugin from 'webpack-s3-plugin'
import EntrypointPlugin from '../lib/entrypoint-plugin'
import StylesheetPlugin from '../lib/stylesheet-plugin'

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, CLIENT_CDN_BASE_URL, NODE_ENV } = process.env
const isProd = NODE_ENV === 'production'
const roodDir = process.cwd()

export default {
  devtool: !isProd ? 'eval' : 'source-map',
  target: 'web',
  entry: [
    ...(!isProd
      ? ['react-hot-loader/patch', 'webpack-dev-server/client?http://0.0.0.0:5001', 'webpack/hot/only-dev-server']
      : []),
    join(roodDir, 'client/index.js'),
  ],
  output: {
    path: !isProd ? join(roodDir, '.build') : join(roodDir, 'dist'),
    publicPath: !isProd ? 'http://0.0.0.0:5001/assets/' : `${CLIENT_CDN_BASE_URL}/assets/`,
    filename: !isProd ? '[name].js' : '[name].[chunkhash].js',
    chunkFilename: !isProd ? '[name].js' : '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [
    // NOTE: This is needed for bundled libraries like Redux!
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    ...(!isProd
      ? [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin(), new webpack.NoEmitOnErrorsPlugin()]
      : [
          new EntrypointPlugin(),
          // new S3Plugin({
          //   basePath: 'assets',
          //   // NOTE: Leave dotfiles and server.js behind!
          //   exclude: [/\.entrypoint/, /\.stylesheet/, /server\.js/],
          //   progress: false,
          //   s3Options: {
          //     accessKeyId: AWS_ACCESS_KEY_ID,
          //     secretAccessKey: AWS_SECRET_ACCESS_KEY,
          //   },
          //   s3UploadOptions: { Bucket: '<NAME_OF_BUCKET' },
          // }),
          new StylesheetPlugin(),
          new webpack.HashedModuleIdsPlugin(),
        ]),
  ],
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    disableHostCheck: true,
    host: '0.0.0.0',
    port: '5001',
    publicPath: 'http://0.0.0.0:5001/assets/',
    hot: true,
  },
}
