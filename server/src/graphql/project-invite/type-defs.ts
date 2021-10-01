import { gql } from 'apollo-server-express'

const typeDef = gql`
  extend type Mutation {
    createInvite(projectId: ID, email: String): Invite
    acceptInvite(inviteCode: String, email: String): InviteStatus
    revokeInvite(inviteId: Int): RevokeStatus
  }

  # extend type Query

  type Invite {
    email: String
    inviteCode: String
  }

  type InviteStatus {
    isAccepted: Boolean!
    message: String
  }

  type RevokeStatus {
    revoked: Boolean!
    message: String
  }
`

export default typeDef
