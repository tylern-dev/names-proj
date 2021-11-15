import { gql } from 'apollo-server-express'
const typeDef = gql`
  extend type Query {
    name(name: String, nameId: String): [Name]
    names(skip: Int, take: Int, sex: Sex, orderByName: OrderBy): Names
  }

  type Names {
    names: [Name]
    # cursor: Int
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
