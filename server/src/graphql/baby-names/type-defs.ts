import { gql } from 'apollo-server-express'
const typeDef = gql`
  type Query {
    name(name: String, nameId: String): [Name]
    names(skip: Int, take: Int, sex: Sex, orderByName: OrderBy): Names
    namesByYear(skip: Int, take: Int, sex: Sex, year: Int!, orderByRank: OrderBy): [NamesByYear]
    age: Int
  }

  type Mutation {
    addName: Boolean
  }

  type NamesByYear {
    nameId: ID
    year: Int
    rank: Int
    name: Name
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
    # cursor: Int
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

  enum OrderBy {
    asc
    desc
  }
`

export default typeDef
