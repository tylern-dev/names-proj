import { gql } from 'apollo-server-express'

export const Rating = gql`
  type Rating {
    id: ID
    rating: Int
    user: User
  }
`
