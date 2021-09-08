import { project, userProfile } from '.prisma/client'
import { ID } from 'graphql-modules/shared/types'
import { Context } from 'src/types/common'
import { Model } from '../types'

const getProject = async (projectId: ID, model: Model): Promise<project> => {
  return await model.prisma.project.findFirst({ where: { id: projectId } })
}

const getProjectGuests = async (projectId: ID, model: Model): Promise<userProfile[]> => {
  return await model.prisma.project.findUnique({ where: { id: projectId } }).guests()
}

export const getIsProjectOwner = async (projectId: ID, { models, user }: Context): Promise<boolean> => {
  const project = await getProject(projectId, models)
  return project.ownerId === user.payload.userId
}

export const getIsGuestOfProject = async (projectId: ID, { models, user }: Context): Promise<boolean> => {
  const hasProject = await (await getProjectGuests(projectId, models)).find((u) => u.userId === user.payload.userId)
  return !!hasProject
}
