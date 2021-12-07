import { gql } from 'apollo-server-express'

export const Invite = gql`
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
