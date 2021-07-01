// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
}

module.exports = config

// Or async function
module.exports = async () => {
  return {
    verbose: true,
  }
}
