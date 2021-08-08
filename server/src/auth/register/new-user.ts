import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

interface User {
  id: number
  email: string
  firstName: string | null
  lastName: string | null
  role: Role
}

export const newUser = async ({ email = '', password = '', firstName = '', lastName = '' } = {}):Promise<User> => {
  return await prisma.user.create({
    data: {
      email,
      password,
      firstName,
      lastName,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true
    },
  })
}
