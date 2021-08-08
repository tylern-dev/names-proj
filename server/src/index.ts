import dotenv from 'dotenv'
import chalk from 'chalk'
import cors from 'cors'
import { json } from 'body-parser'
import expressJwt from 'express-jwt'
import authApi from './auth'

dotenv.config()

const { HOST, PORT, JWT_ACCESS_TOKEN_SECRET='', REFRESH_TOKEN_SECRET } = process.env

import express from 'express'
import createApolloServer from './lib/create-apollo-server.js'
import { ApolloServer } from 'apollo-server-express'

const app = express()

app.use(cors())
app.use(json())
app.use(
  expressJwt({
    secret: JWT_ACCESS_TOKEN_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false,
  })
)

app.use('/auth-api', authApi)

createApolloServer()
  .then(async (apolloServer: ApolloServer) => {
    apolloServer
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
  .catch((error:Error) => console.error('Error creating Apollo Server', error))
