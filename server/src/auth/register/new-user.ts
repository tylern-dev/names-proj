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
  firstName?: string
  lastName?: string
  authId?: string
}

export const newUser = async ({ email, firstName, lastName, authId }: CreateUser = {}): Promise<User> => {
  const user = await prisma.user.create({
    data: {
      userProfile: {},
      email,
      firstName,
      lastName,
      authId,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
    },
  })

  await prisma.userProfile.create({ data: { userId: user.id } })

  return user
}
