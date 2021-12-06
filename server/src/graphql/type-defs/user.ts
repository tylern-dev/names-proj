import { gql } from 'apollo-server-express'

export const User = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
  }
`
