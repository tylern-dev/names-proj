/** @type {import("snowpack").SnowpackUserConfig } */
import dotenv from 'dotenv'
const env = dotenv.config({ path: '../.env' })

export default {
  mount: {
    src: '/dist',
    public: { url: '/', static: true },
    '.../shared': '/shared',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    // [
    //   '@snowpack/plugin-babel',

    //   {
    //     input: ['.js', '.mjs', '.jsx', '.ts', '.tsx'], // (optional) specify files for Babel to transform
    //     transformOptions: {
    //       // babel transform options
    //     },
    //   },
    // ],
    ['@snowpack/plugin-typescript', { tsc: 'tsc' }],
  ],
  devOptions: {
    hostName: 'localhost',
    output: 'stream',
    port: 3000,
    open: 'none',
  },
  env: {
    ...env.parsed,
  },
  packageOptions: {
    source: 'remote',
    types: true,
  },
}
