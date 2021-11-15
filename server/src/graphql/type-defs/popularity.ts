import { gql } from 'apollo-server-express'

export const Popularity = gql`
  type Popularity {
    id: Int
    year: Int
    rank: Int
    popularity: Int
  }
`
