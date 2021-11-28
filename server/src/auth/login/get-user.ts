import { PrismaClient, user } from '@prisma/client'
import prisma from '../../../client'

export const getUser = async ({ email = '' } = {}): Promise<user | null> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
}
