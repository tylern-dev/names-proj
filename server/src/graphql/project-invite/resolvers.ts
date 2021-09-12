import { ID } from 'graphql-modules/shared/types'
import { Context } from '../../types/common'
import { getIsProjectOwner } from '../common/get-projects-for-user'

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
      // verify and update projectectInvite
      try {
        const invite = await models.prisma.projectInvite.findFirst({
          where: {
            AND: [{ email: email }, { inviteCode: inviteCode }],
          },
          select: { projectId: true, id: true },
        })
        await models.prisma.$transaction([
          models.prisma.projectInvite.update({
            where: { id: invite.id },
            data: { accepted: true, acceptedDate: new Date() },
          }),
          // models.prisma.userProfile.upsert({where:{}})
        ])

        return true
      } catch (e) {
        console.error(e)
      }
      // update guestOf in user profile
    },
    // cancelInvite: async (parent: any, { inviteCode: string }, { models, user }: Context) => {},
  },
  // Query: {
  // invites: async (parent: any, { email: string }, { models, user }: Context) => {},
  // createdInvites: async (parent: any, { pending }: { pending: boolean }, { models, user }: Context) => {},
  // },
}

export default resolvers
