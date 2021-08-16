import { gql } from 'apollo-server-express'
const typeDef = gql`
  type Query {
    name(name: String): [Name]
    names(cursorPosition: Int!, take: Int): Names
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

  type Names {
    names: [Name]
    cursor: Int
  }

  type Popularity {
    id: Int
    year: Int
    rank: Int
    popularity: Int
  }
`

export default typeDef
