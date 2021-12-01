import { gql, ApolloError } from 'apollo-server-express'
import { Context } from '../../types/common'
import { getIsGuestOfProject, getIsProjectOwner, getIsProjectActive } from '../common/get-projects-for-user'

export const AddNameToProject = gql`
  extend type Mutation {
    addNameToProject(projectId: String!, nameId: String!): BabyName
  }
`

export const resovers = {
  Mutation: {
    addNameToProject: async (
      parent,
      { projectId, nameId }: { projectId: string; nameId: string },
      { models, user }: Context
    ) => {
      //TODO: has name already been added?
      const isProjectOwner = await getIsProjectOwner(projectId, { user })
      const isGuestOfProject = await getIsGuestOfProject(projectId, { user })
      const isProjectActive = await getIsProjectActive(projectId)
      if (!isProjectActive) throw new ApolloError('Project is not active')
      if (isProjectOwner || isGuestOfProject) {
        return await models.prisma.projectBabyName.create({
          data: {
            userId: user.payload.userId,
            nameId: nameId,
            projectId: projectId,
          },
        })
      }
      return null
    },
  },
}
