// import esbuild from 'esbuild'
const esbuild = require('esbuild')
;(async () => {
  try {
    await esbuild.build({
      entryPoints: ['./src/index.js'],
      outdir: 'dist',
      bundle: true,
      sourcemap: true,
      platform: 'node',
      external: ['express'],
    })
  } catch (e) {
    console.error('error', e)
    throw Error(e)
  }
})()
