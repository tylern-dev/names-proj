import { Context } from 'src/types/common'

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
      return !!project
    },
    addNameToProject: async (
      parent: any,
      { projectId, nameId }: { projectId: string; nameId: string },
      { models, user }: Context
    ) => {
      const userHasProjectId = await models.prisma.user.findFirst({
        where: {
          id: user.payload.userId,
          project: { some: { id: projectId } },
        },
      })

      if (userHasProjectId) {
        const nameWithProject = await models.prisma.project.update({
          where: { id: projectId },
          data: { babyName: { create: { nameId: nameId } } },
          include: { babyName: { include: { name: true } } },
        })

        console.log(nameWithProject.babyName)
        return nameWithProject
      }
      return null
    },
  },
  Project: {
    babyName: (root: any, args: any, { models }: Context) =>
      models.prisma.project.findFirst({ where: { id: root.id } }).babyName(),
  },
  BabyName: {
    name: (root: any, args: any, { models }: Context) => models.prisma.name.findFirst({ where: { id: root.nameId } }),
  },
}

export default resolvers
