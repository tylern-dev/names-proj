import { PrismaClient, user } from '@prisma/client'

const prismaClient = new PrismaClient()

export const findUser = async (authId: string): Promise<user> => {
  const foundUser = await prismaClient.user.findUnique({ where: { authId } })
  return foundUser
}
