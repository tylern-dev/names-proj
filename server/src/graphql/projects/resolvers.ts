import { Context } from 'src/types/common'
import { getIsOwnerOfProjectName } from '../common/get-project-names'
const resolvers = {
  Mutation: {
    deleteNameFromProject: async (
      parent: any,
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

export default resolvers
