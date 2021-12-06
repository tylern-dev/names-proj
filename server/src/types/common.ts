import { PrismaClient, role, user, sex } from '@prisma/client'

interface JwtPayload {
  payload: {
    userId: string
    role: role
    email: string
  }
}

export interface Model {
  prisma: PrismaClient
}
export interface Context {
  models?: Model
  user?: JwtPayload
}

export type OrderBy = 'asc' | 'desc'

export interface NamesArgs {
  skip: number
  take: number
  orderByName?: OrderBy
  sex?: sex
}
