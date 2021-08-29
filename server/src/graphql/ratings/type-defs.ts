import { gql } from 'apollo-server-express'

const typeDef = gql`
  extend type Mutation {
    createRating(projectBabyNameId: ID, rating: Int): Rating
  }
`

export default typeDef
