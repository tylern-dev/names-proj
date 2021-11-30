import { gql } from 'apollo-server-express'
import { Context } from '../../types/common'
import { getIsProjectOwner } from '../common/get-projects-for-user'

export const DeactivateProject = gql`
  extend type Mutation {
    deactivateProject(projectId: ID!): Project
  }
`

export const resolvers = {
  Mutation: {
    deactivateProject: async (parent: any, { projectId }: any, { models, user }: Context) => {
      const isProjectOwner = await getIsProjectOwner(projectId, { models, user })
      if (isProjectOwner) {
        return await models.prisma.project.update({ where: { id: projectId }, data: { isActive: false } })
      }
    },
  },
}
