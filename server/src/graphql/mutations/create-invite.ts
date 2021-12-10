import { gql, AuthenticationError } from 'apollo-server-express'
import { Context } from '../../types/common'
import { apolloError } from '../common/apollo-error'
import { getIsProjectOwner } from '../common/get-projects-for-user'

export const CreateInvite = gql`
  extend type Mutation {
    createInvite(projectId: ID, email: String): Invite
  }
`
export const resolvers = {
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
      } else {
        apolloError('Unathorized: Not project owner')
      }
    },
  },
}
