import { ID } from 'graphql-modules/shared/types'
import { Model } from '../types'

export const getUser = async (id: ID, model: Model) => await model.prisma.user.findUnique({ where: { id } })
