import dotenv from 'dotenv'
import chalk from 'chalk'
import cors from 'cors'
import { json } from 'body-parser'
import express from 'express'
import { initializeApp, credential } from 'firebase-admin'
import createApolloServer from './lib/create-apollo-server.js'
import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import expressJwt from 'express-jwt'
import authApi from './auth'
import adminApi from './admin'
import { handleAuthentication } from './auth/middleware/authentication'

dotenv.config()
import './lib/firebase-config'

const { PORT, JWT_ACCESS_TOKEN_SECRET = '' } = process.env

const app = express()

app.use(cors())
app.use(json())
app.use(cookieParser())
app.use('/auth-api', authApi)
app.use('/api/admin/', adminApi)
app.use(handleAuthentication)

createApolloServer()
  .then(async (apolloServer: ApolloServer) => {
    apolloServer
    await apolloServer.start()
    apolloServer.applyMiddleware({
      app,
      path: '/graphql',
    })

    const url = `http://localhost:${PORT}${apolloServer.graphqlPath}`
    app.listen({ port: PORT }, () => {
      // eslint-disable-next-line no-console
      console.log(`\n🚀 Apollo Server ready at ${chalk.blue(url)}`)
      console.log(`\n Server is ready at http://localhost:${PORT}`)
    })
  })
  .catch((error: Error) => console.error('Error creating Apollo Server', error))
