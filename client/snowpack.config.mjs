import dotenv from 'dotenv'
const env = dotenv.config({ path: '../.env' })

export default {
  mount: {
    src: '/dist',
    public: { url: '/', static: true },
    '.../shared': '/shared',
  },
  plugins: ['@snowpack/plugin-dotenv', '@snowpack/plugin-babel'],
  devOptions: {
    hostName: 'localhost',
    output: 'stream',
    port: 3000,
    open: 'none',
  },
  env: {
    ...env.parsed,
  },
}
