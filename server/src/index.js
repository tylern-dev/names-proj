// import { createServer } from 'http'
// import app from './server'
import { ApolloServer, gql } from 'apollo-server-express'
import dotenv from 'dotenv'
import chalk from 'chalk'

dotenv.config()

const { HOST, PORT } = process.env
// const server = createServer(app)
// server.listen(PORT, HOST, () => {
//   console.info(`Listening on port http://${HOST}:${PORT}`)
// })

import express from 'express'
import createApolloServer from './lib/create-apollo-server.js'

const app = express()
export default app

app.get('/', (req, res) => {
  res.send({ data: 'Hello world' })
})

app.post('/names', (req, res) => {})

createApolloServer()
  .then(async (apolloServer) => {
    await apolloServer.start()
    apolloServer.applyMiddleware({
      app,
      path: '/graphql',
    })

    const url = `http://localhost:${PORT}${apolloServer.graphqlPath}`
    app.listen({ port: PORT }, () =>
      // eslint-disable-next-line no-console
      console.log(`\n🚀 Server ready at ${chalk.blue(url)}`)
    )
  })
  .catch((error) => console.error('Error creating Apollo Server', error))
