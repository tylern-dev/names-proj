import { gql } from 'apollo-server-express'
const typeDef = gql`
  type Query {
    name(name: String): [Name]
    age: Int
  }

  type Mutation {
    addName: Boolean
  }

  type Name {
    id: ID
    name: String
    sex: String
    createdAt: String
    updatedAt: String
    popularity: [Popularity]
  }

  type Popularity {
    id: Int
    year: Int
    rank: Int
    popularity: Int
  }
`

export default typeDef
