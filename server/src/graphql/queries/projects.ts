import { gql } from 'apollo-server-express'
import { Context } from '../../types/common'

export const Projects = gql`
  extend type Query {
    projects: [Project]
  }
`

export const resolvers = {
  Query: {
    projects: async (parent: any, args: any, { models, user }: Context) =>
      await models.prisma.project.findMany({ where: { ownerId: user.payload.userId } }),
  },
}
