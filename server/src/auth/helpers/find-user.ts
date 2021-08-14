import { PrismaClient, user } from '@prisma/client'

const prismaClient = new PrismaClient()

export const findUser = async (email: string): Promise<user> => {
  const foundUser = await prismaClient.user.findUnique({ where: { email: email } })
  return foundUser
}
