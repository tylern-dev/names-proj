import { gql } from 'apollo-server-express'
import { Context } from '../../types/common'
import { getProjectInviteById } from '../common/get-project-invite'

export const RevokeInvite = gql`
  extend type Mutation {
    revokeInvite(inviteId: Int): RevokeStatus
  }
`

export const resolvers = {
  Mutation: {
    revokeInvite: async (parent: any, { inviteId }: { inviteId: number }, { models, user }: Context) => {
      try {
        const invite = await getProjectInviteById({ inviteId, models })
        if (invite.accepted) {
          return {
            revoked: false,
            message: 'Invite already accepted',
          }
        }
        const projectOwner = await (await models.prisma.project.findFirst({ where: { id: invite.projectId } })).ownerId
        if (projectOwner !== user.payload.userId) {
          return {
            revoked: false,
            message: 'Unable to revoke. Not project owner.',
          }
        }
        await models.prisma.projectInvite.update({ data: { revoked: true }, where: { id: inviteId } })
        return {
          revoked: true,
        }
      } catch (error) {}
    },
  },
}
