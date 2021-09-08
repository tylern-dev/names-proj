import { ID } from 'graphql-modules/shared/types'
import { Model } from '../types'

export const getIsOwnerOfProjectName = async (projectNameId: ID, userId: ID, models: Model) =>
  await models.prisma.projectBabyName.findFirst({
    where: { AND: [{ id: projectNameId }, { project: { owner: { id: userId } } }] },
  })
