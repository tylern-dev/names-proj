import { gql } from 'apollo-server-express'

const typeDef = gql`
  extend type Mutation {
    createInvite(projectId: ID, email: String): Invite
    acceptInvite(inviteCode: String, email: String): Boolean
  }

  # extend type Query

  type Invite {
    email: String
    inviteCode: String
  }
`

export default typeDef
