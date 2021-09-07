import { PrismaClient, role, user } from '@prisma/client'

interface JwtPayload {
  payload: {
    userId: string
    role: role
  }
}

export interface Model {
  prisma: PrismaClient
}
export interface Context {
  models: Model
  user: JwtPayload
}

export type OrderBy = 'asc' | 'desc'
