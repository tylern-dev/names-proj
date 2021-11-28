import { gql } from 'apollo-server-express'
import { Context } from 'src/types/common'

interface CreateProjectArgs {
  id: string
  projectName: string
}

export const CreateProject = gql`
  extend type Mutation {
    createProject(projectName: String!): Project
  }
`
export const resolvers = {
  Mutation: {
    createProject: async (
      parent: any,
      { id, projectName }: CreateProjectArgs,
      {
        models,
        user: {
          payload: { userId },
        },
      }: Context
    ) => {
      const project = await models.prisma.project.create({
        data: {
          ownerId: userId,
          projectName: projectName,
        },
      })
      return project
    },
  },
}
