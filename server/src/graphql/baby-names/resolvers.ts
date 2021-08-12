import { PrismaClient } from '@prisma/client'
import {} from 'apollo-server-express'

type Model = {
  prisma: PrismaClient
}

type Context = {
  models: Model
}

type Args = {
  babyName: string
}

const resolvers = {
  Query: {
    name: (parent: any, { babyName }: Args, { models }: Context) =>
      models.prisma.name.findFirst({ where: { name: babyName } }),
    age: () => 1,
  },
  Mutation: {
    addName: () => true,
  },
}
export default resolvers
