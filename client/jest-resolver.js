/* T
 * This file fixes an issue with using firebase/auth.
 * It resolves an issues with the esm that fireabase/auth is using.
 */
//https://github.com/facebook/jest/issues/9771#issuecomment-1005939654
// temporary workaround while we wait for https://github.com/facebook/jest/issues/9771
const importResolver = require('enhanced-resolve').create.sync({
  conditionNames: ['import', 'node', 'default'],
  extensions: ['.js', '.json', '.node', '.ts', '.tsx', '.jsx'],
})
const requireResolver = require('enhanced-resolve').create.sync({
  conditionNames: ['require', 'node', 'default'],
  extensions: ['.js', '.json', '.node', '.ts', '.tsx', '.jsx'],
})

module.exports = function (request, options) {
  let resolver = requireResolver
  if (options.conditions?.includes('import')) {
    resolver = importResolver
  }
  return resolver(options.basedir, request)
}
