import { gql } from 'apollo-server-express'

export const BabyName = gql`
  type BabyName {
    id: ID
    nameId: String
    name: Name
    limit: Int
    addedBy: User
    ratings: [Rating]
    projectId: String
  }
`
