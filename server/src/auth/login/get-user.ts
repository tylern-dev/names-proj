import { PrismaClient, user } from '@prisma/client'

const prisma = new PrismaClient()

export const getUser = async ({ email = '' } = {}): Promise<user | null> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
}
