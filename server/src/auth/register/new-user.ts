import { PrismaClient, role } from '@prisma/client'

const prisma = new PrismaClient()

interface User {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  role: role
}

export const newUser = async ({ email = '', password = '', firstName = '', lastName = '' } = {}): Promise<User> => {
  return await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      authentication: {
        create: {
          password,
        },
      },
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
    },
  })
}
