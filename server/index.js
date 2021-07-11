import { createServer } from 'http'
import app from './server'

const { HOST, PORT } = process.env
const server = createServer(app)
server.listen(PORT, HOST, () => {
  console.info(`Listening on port http://${HOST}:${PORT}`)
})

let current = app

module.hot &&
  module.hot.accept('./server', () => {
    const { default: next } = require('./server')

    server.removeListener('request', current)
    server.on('request', next)

    current = next
  })
