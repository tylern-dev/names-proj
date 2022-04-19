import { PrismaClient, user } from '@prisma/client'
import prisma from '../../../client'

export const getUser = async ({ authId = '' } = {}): Promise<user | null> => {
  return await prisma.user.findUnique({
    where: { authId },
  })
}
