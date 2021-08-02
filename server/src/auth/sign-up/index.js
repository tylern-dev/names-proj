import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const newUser = async ({ email, password, firstName = '', lastName = '' } = {}) => {
  console.log(email, password)
  return await prisma.user.create({
    data: {
      email,
      password,
      firstName,
      lastName,
    },
  })
}
