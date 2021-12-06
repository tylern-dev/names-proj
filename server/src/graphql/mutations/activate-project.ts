import { gql, ApolloError } from 'apollo-server-express'
import { Context } from '../../types/common'
import { apolloError } from '../common/apollo-error'
import { getIsProjectOwner } from '../common/get-projects-for-user'

export const ActivateProject = gql`
  extend type Mutation {
    activateProject(projectId: ID): ProjectStatus
  }
`

export const resolvers = {
  Mutation: {
    activateProject: async (parent: any, { projectId }: any, { models, user }: Context) => {
      const isProjectOwner = await getIsProjectOwner(projectId, { user })
      if (isProjectOwner) {
        const isActive = await (
          await models.prisma.project.update({ where: { id: projectId }, data: { isActive: true } })
        ).isActive
        return { isActive }
      } else {
        apolloError('Not authorized')
      }
    },
  },
}
