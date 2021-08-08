import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()



export const getUser = async ({ email = '' } = {}):Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
}
