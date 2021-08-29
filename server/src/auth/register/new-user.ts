import { role } from '@prisma/client'
import prisma from '../../../client'

interface User {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  role: role
}

interface CreateUser {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
}

export const newUser = async ({ email, password, firstName, lastName }: CreateUser = {}): Promise<User> => {
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
