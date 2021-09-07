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
    createProject: async (
      parent: any,
      { id, projectName }: { id: string; projectName: string },
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
      // FIGURE OUT WHY I AM GETTING THE ADDED BY ERROR BUT THE NAME STILL ADDS. THIS IS HAPPENING WHEN IT IS RETRIEVING THE ADDED BY NAME

      const isProjectOwner = await getIsProjectOwner(projectId, { models, user })
      const isGuestOfProject = await getIsGuestOfProject(projectId, { models, user })
      if (isProjectOwner || isGuestOfProject) {
        const nameWithProject = await models.prisma.project.update({
          where: { id: projectId },
          data: {
            babyName: {
              create: {
                nameId: nameId,
                userId: user.payload.userId,
              },
            },
          },
        })
        return nameWithProject
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
