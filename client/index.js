import render from './render'
import Routes from './routes'

render({ Routes })

module.hot &&
  module.hot.accept('./routes', () => {
    const { default: Routes } = require('./routes')
    render({ Routes })
  })
