import { gql } from 'apollo-server-express'
import { Context } from '../../types/common'
import { getIsProjectOwner } from '../common/get-projects-for-user'

export const GetProjectInvites = gql`
  extend type Query {
    getProjectInvites(projectId: ID): [ProjectInvite]
  }

  type ProjectInvite {
    # id: String
    inviteCode: String
    email: String
    accepted: Boolean
    acceptedDate: DateTime
    createdAt: DateTime
    revoked: Boolean
    user: User
  }
`

export const resolvers = {
  Query: {
    getProjectInvites: async (parent, { projectId }: { projectId: string }, { models, user }: Context) => {
      const isProjectOwner = await getIsProjectOwner(projectId, { user })
      if (isProjectOwner) {
        // do work here for getting all invites for project
        const invites = await models.prisma.projectInvite.findMany({ where: { projectId } })
        return invites
      }
    },
  },
}
