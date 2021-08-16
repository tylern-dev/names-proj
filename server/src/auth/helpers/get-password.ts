import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const getPassword = async (userId: string) =>
  await prisma.authentication.findFirst({ where: { userId }, select: { password: true } })
