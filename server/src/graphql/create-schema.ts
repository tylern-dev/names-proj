import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers as nameResolvers, typeDefs as nameTypeDefs } from './baby-names'
import { resolvers as projectResolvers, typeDefs as projectTypeDefs } from './projects'
import { ratingTypeDefs, ratingResolvers } from './ratings'
import { inviteTypeDef, inviteResolvers } from './project-invite'
import { NamesByYear, resolvers as NamesByYearResolver } from './queries/names-by-year'
import typeDefs from './type-defs'

const initialTypeDefs = gql`
  type Query {
    _empty: String!
  }

  type Mutation {
    _empty: String!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

const resolvers = [nameResolvers, projectResolvers, ratingResolvers, inviteResolvers, NamesByYearResolver]

const types = [initialTypeDefs, nameTypeDefs, projectTypeDefs, ratingTypeDefs, inviteTypeDef, NamesByYear, ...typeDefs]

export const schema = makeExecutableSchema({ typeDefs: types, resolvers: resolvers })
