import { gql } from 'apollo-server-express'
import { Context } from '../../types/common'
import { getIsOwnerOfProjectName } from '../common/get-project-names'
export const DeleteNameFromProject = gql`
  extend type Mutation {
    deleteNameFromProject(projectBabyNameId: ID): Void
  }
`

export const resolvers = {
  Mutation: {
    deleteNameFromProject: async (
      parent,
      { projectBabyNameId }: { projectBabyNameId: string },
      { models, user }: Context
    ) => {
      // TODO: Maybe we want the owner, or whoever added the name to be able to delete their own added name
      const isProjectOwner = await getIsOwnerOfProjectName(projectBabyNameId, user.payload.userId, models)
      if (isProjectOwner) {
        return await models.prisma.projectBabyName.delete({
          where: { id: projectBabyNameId },
        })
      }
    },
  },
}
