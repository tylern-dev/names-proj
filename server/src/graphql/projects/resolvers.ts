import { Context } from 'src/types/common'

const resolvers = {
  Query: {
    project: async (
      parent: any,
      { id }: { id: string },
      {
        models,
        user: {
          payload: { userId },
        },
      }: Context,
      info: any
    ) => {
      console.log(info)
      if (id) {
        return await models.prisma.project.findUnique({
          where: { id },
        })
      }
      const project = await models.prisma.project.findMany({
        where: {
          ownerId: userId,
        },
        include: { babyName: { include: { name: true } } },
      })
      console.log({ project })
      return project
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
      console.log(nameId)
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
      // const project = await models.prisma.project.update({
      //   where: { id: projectId },
      //   data: { babyName: { create: { nameId } } },
      // })
    },
  },
  Project: {
    projectName: async ({ id }: { id: string }) => console.log({ id }),
  },
}

export default resolvers
