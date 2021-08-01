import dotenv from 'dotenv'
import chalk from 'chalk'
import cors from 'cors'
import bodyParser from 'body-parser'
import expressJwt from 'express-jwt'
import authApi from './auth'

dotenv.config()

const { HOST, PORT, JWT_SECRET } = process.env

import express from 'express'
import createApolloServer from './lib/create-apollo-server.js'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(
  expressJwt({
    secret: JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false,
  })
)

app.use('/auth-api', authApi)

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
