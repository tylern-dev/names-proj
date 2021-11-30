import { Context } from 'src/types/common'
import { getIsOwnerOfProjectName } from '../common/get-project-names'
import { getIsGuestOfProject, getIsProjectOwner } from '../common/get-projects-for-user'
import { getUser } from '../common/get-user'
const resolvers = {
  Mutation: {
    addNameToProject: async (
      parent: any,
      { projectId, nameId }: { projectId: string; nameId: string },
      { models, user }: Context
    ) => {
      //TODO: has name already been added?
      const isProjectOwner = await getIsProjectOwner(projectId, { models, user })
      const isGuestOfProject = await getIsGuestOfProject(projectId, { models, user })
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
    // TODO: Is there a better way of locking this down? Right now I am just passing an ID
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
