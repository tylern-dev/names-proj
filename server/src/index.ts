import path from 'path'
import dotenv from 'dotenv'
import chalk from 'chalk'
import cors from 'cors'
import { json } from 'body-parser'
import express from 'express'
import csrf from 'csurf'
import createApolloServer from './lib/create-apollo-server.js'
import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import authApi from './auth'
import adminApi from './admin'
import { handleAuthentication } from './auth/middleware/authentication'
import './lib/firebase-config'

dotenv.config()

const { PORT } = process.env

const app = express()

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600, // 1-hour
  },
})
app.use(cors({ origin: true }))
app.use(json())
app.use(cookieParser())
process.env.NODE_ENV === 'production' && app.use(csrfProtection)
app.use('/auth-api', authApi)
app.use('/api/admin/', adminApi)
// app.use(handleAuthentication)

app.use(
  '/',
  (req, res, next) => {
    process.env.NODE_ENV === 'production' && res.cookie('csrf-token', req.csrfToken())
    next()
  },
  express.static(path.join(__dirname, '../../client/dist'))
)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
})

createApolloServer()
  .then(async (apolloServer: ApolloServer) => {
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
