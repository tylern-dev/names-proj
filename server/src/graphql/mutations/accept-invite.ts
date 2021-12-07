import { gql } from 'apollo-server-express'
import { Context } from '../../types/common'
import { getUserProfile } from '../common/get-user-profile'
import { getProjectInvite } from '../common/get-project-invite'
import { apolloError } from '../common/apollo-error'

interface IAcceptInviteArgs {
  inviteCode: string
  email: string
}

export const AcceptInvite = gql`
  extend type Mutation {
    acceptInvite(inviteCode: String, email: String): InviteStatus
  }
`

export const resolvers = {
  Mutation: {
    acceptInvite: async (parent: any, { inviteCode, email }: IAcceptInviteArgs, { models, user }: Context) => {
      try {
        const invite = await getProjectInvite({ email, inviteCode, models })

        if (invite.accepted) {
          return {
            isAccepted: invite.accepted,
            message: 'Invite has already been accepted',
          }
        }
        if (invite.revoked) {
          return {
            isAccepted: false,
            message: 'Invite has been revoked',
          }
        }
        const userProfile = await getUserProfile({ models, user })

        const [projectInvite] = await models.prisma.$transaction([
          models.prisma.projectInvite.update({
            where: { id: invite.id },
            data: { accepted: true, acceptedDate: new Date(), userId: user.payload.userId },
          }),
          models.prisma.project.update({
            data: { guests: { connect: { id: userProfile.id } } },
            where: { id: invite.projectId },
          }),
        ])
        return {
          isAccepted: projectInvite.accepted,
          message: '',
        }
      } catch (e) {
        console.error(e)
        apolloError(e)
      }
    },
  },
}
