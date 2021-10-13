import { Context } from '../../types/common'
import { getProjectInvite, getProjectInviteById } from '../common/get-project-invite'
import { getIsProjectOwner } from '../common/get-projects-for-user'
import { getUserProfile } from '../common/get-user-profile'

const resolvers = {
  Mutation: {
    createInvite: async (
      parent: any,
      { email, projectId }: { email: string; projectId: string },
      { models, user }: Context
    ) => {
      const isProjectOwner = await getIsProjectOwner(projectId, { models, user })
      if (isProjectOwner) {
        const invite = await models.prisma.projectInvite.create({
          data: {
            email: email,
            projectId: projectId,
          },
        })
        return {
          email: invite.email,
          inviteCode: invite.inviteCode,
        }
      }
    },
    acceptInvite: async (
      parent: any,
      { inviteCode, email }: { inviteCode: string; email: string },
      { models, user }: Context
    ) => {
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
        return false
      }
    },
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
  // Query: {
  // invites: async (parent: any, { email: string }, { models, user }: Context) => {},
  // createdInvites: async (parent: any, { pending }: { pending: boolean }, { models, user }: Context) => {},
  // },
}

export default resolvers
