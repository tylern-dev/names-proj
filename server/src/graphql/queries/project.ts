import { gql } from 'apollo-server-express'
import { Context } from '../../types/common'
import { getUser } from '../common/get-user'
export const Project = gql`
  extend type Query {
    project(id: ID!): Project
  }
`
export const resolvers = {
  Query: {
    project: async (parent: any, { id }: { id: string }, { models, user: userContex }: Context) => {
      // should this be locked down to whom ever created it or who is apart of the project?
      const project = await models.prisma.project.findUnique({
        where: { id },
        include: {
          guests: {
            include: {
              user: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      })
      if (project.ownerId !== userContex.payload.userId) return null
      // handle the guests portion of this query. If a user is a guest they should be able to query
      return project
    },
  },

  Project: {
    babyName: (root: any, args: any, { models }: Context) => {
      console.log('here')
      models.prisma.project.findFirst({ where: { id: root.id } }).babyName()
    },
  },
  BabyName: {
    name: async (root: any, args: any, { models }: Context) =>
      await models.prisma.name.findFirst({ where: { id: root.nameId } }),
    ratings: async (root: any, args: any, { models }: Context) =>
      await models.prisma.projectBabyName.findFirst({ where: { nameId: root.nameId } }).ratings(),
    addedBy: async (root: any, args: any, { models }: Context) => await getUser(root.userId, models),
  },
  Rating: {
    user: (root: any, args: any, { models }: Context) => models.prisma.user.findFirst({ where: { id: root.userId } }),
  },
}
