import { ExpressContext } from 'apollo-server-express'
import prisma from '../../client'

export default function apolloServerContext({ req }: ExpressContext) {
  const user = req.user || null
  return {
    req,
    user,
    models: {
      prisma,
    },
    // authToken
  }
}
