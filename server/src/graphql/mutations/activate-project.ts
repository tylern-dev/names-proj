import { gql } from 'apollo-server-express'
import { Context } from '../../types/common'
import { getIsProjectOwner } from '../common/get-projects-for-user'

export const ActivateProject = gql`
  extend type Mutation {
    activateProject(projectId: ID): Project
  }
`

export const resolvers = {
  Mutation: {
    activateProject: async (parent: any, { projectId }: any, { models, user }: Context) => {
      const isProjectOwner = await getIsProjectOwner(projectId, { models, user })
      if (isProjectOwner) {
        return await models.prisma.project.update({ where: { id: projectId }, data: { isActive: true } })
      }
    },
  },
}
