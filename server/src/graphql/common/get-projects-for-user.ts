import { project, userProfile } from '.prisma/client'
import { ID } from 'graphql-modules/shared/types'
import { Context } from 'src/types/common'
import prisma from '../../../client'

const getProject = async (projectId: ID): Promise<project> => {
  return await prisma.project.findFirst({ where: { id: projectId } })
}

const getProjectGuests = async (projectId: ID): Promise<userProfile[]> => {
  return await prisma.project.findUnique({ where: { id: projectId } }).guests()
}

export const getIsProjectOwner = async (projectId: ID, { user }: Context): Promise<boolean> => {
  const project = await getProject(projectId)
  return project.ownerId === user.payload.userId
}

export const getIsGuestOfProject = async (projectId: ID, { user }: Context): Promise<boolean> => {
  const hasProject = await (await getProjectGuests(projectId)).find((u) => u.userId === user.payload.userId)
  return !!hasProject
}

export const getIsProjectActive = async (projectId: ID): Promise<boolean> => {
  return await (
    await getProject(projectId)
  ).isActive
}
