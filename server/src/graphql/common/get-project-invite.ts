import { projectInvite } from '.prisma/client'
import { modifyObjectFields } from '@graphql-tools/utils'
import { Model } from 'src/types/common'

interface ProjectInviteArgs {
  email: string
  inviteCode: string
  models: Model
}
export const getProjectInvite = async ({ email, inviteCode, models }: ProjectInviteArgs): Promise<projectInvite> => {
  return await models.prisma.projectInvite.findFirst({
    where: {
      AND: [{ email: email }, { inviteCode: inviteCode }],
    },
  })
}

export const getProjectInviteById = async ({
  inviteId,
  models,
}: {
  inviteId: number
  models: Model
}): Promise<projectInvite> => await models.prisma.projectInvite.findUnique({ where: { id: inviteId } })
