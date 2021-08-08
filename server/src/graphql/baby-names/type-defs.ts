import { gql } from 'apollo-server-express'
const typeDef = gql`
  type Query {
    name: String
  }

  type Mutation {
    addName: Boolean
  }
`

export default typeDef
