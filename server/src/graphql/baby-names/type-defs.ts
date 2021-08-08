import { gql } from 'apollo-server-express'
const typeDef = gql`
  type Query {
    name(name: String): String
    age: Int
  }

  type Mutation {
    addName: Boolean
  }
`

export default typeDef
