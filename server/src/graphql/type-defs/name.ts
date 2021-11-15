import { gql } from 'apollo-server-express'

export const Name = gql`
  type Name {
    id: ID
    name: String
    sex: String
    createdAt: String
    updatedAt: String
    popularity: [Popularity]
  }
`
