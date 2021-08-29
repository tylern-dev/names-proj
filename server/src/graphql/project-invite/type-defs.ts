import { gql } from 'apollo-server-express'

const typeDef = gql`
  extend type Mutation {
    createInvite(): Invite
  }

  type Invite {
    project: Project
    invitee: User
    
  }
`

export default typeDef
