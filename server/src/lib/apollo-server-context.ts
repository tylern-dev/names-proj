import { ExpressContext } from 'apollo-server-express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
