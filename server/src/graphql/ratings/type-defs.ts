import { gql } from 'apollo-server-express'

const typeDef = gql`
  extend type Mutation {
    "This will either create a new rating or update and existing one if it exists."
    createRating(projectBabyNameId: ID, rating: Int): Rating
  }
`

export default typeDef
