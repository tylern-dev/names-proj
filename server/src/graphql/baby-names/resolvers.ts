import { PrismaClient } from '@prisma/client'
import {} from 'apollo-server-express'

type Model = {
  prisma: PrismaClient
}

type Context = {
  models: Model
}

type Args = {
  name: string
}

const resolvers = {
  Query: {
    name: async (parent: any, { name }: Args, { models }: Context) =>
      await models.prisma.name.findMany({
        where: { name: name },
        include: { popularity: true },
      }),

    age: () => 1,
  },
  Mutation: {
    addName: () => true,
  },
}
export default resolvers
