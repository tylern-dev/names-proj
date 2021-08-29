import { gql } from 'apollo-server-express'
const typeDef = gql`
  type Query {
    name(name: String, nameId: String): [Name]
    names(cursorPosition: Int!, take: Int, sex: Sex): Names
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

  enum Sex {
    M
    F
  }
`

export default typeDef
