import { Context } from 'src/types/common'
import { getIsOwnerOfProjectName } from '../common/get-project-names'
import { getIsGuestOfProject, getIsProjectOwner } from '../common/get-projects-for-user'
import { getUser } from '../common/get-user'
const resolvers = {
  Query: {
    projects: async (parent: any, args: any, { models, user }: Context) =>
      await models.prisma.project.findMany({ where: { ownerId: user.payload.userId } }),
    project: async (parent: any, { id }: { id: string }, { models }: Context) => {
      return await models.prisma.project.findUnique({ where: { id } })
    },
  },
  Mutation: {
    deactivateProject: async (parent: any, { projectId }: any, { models, user }: Context) => {
      const isProjectOwner = getIsProjectOwner(projectId, { models, user })
      if (isProjectOwner) {
        return await models.prisma.project.update({ where: { id: projectId }, data: { isActive: false } })
      }
    },
    activateProject: async (parent: any, { projectId }: any, { models, user }: Context) => {
      const isProjectOwner = getIsProjectOwner(projectId, { models, user })
      if (isProjectOwner) {
        return await models.prisma.project.update({ where: { id: projectId }, data: { isActive: true } })
      }
    },
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
  Project: {
    babyName: (root: any, args: any, { models }: Context) =>
      models.prisma.project.findFirst({ where: { id: root.id } }).babyName(),
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

export default resolvers
