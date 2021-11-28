import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers as projectResolvers, typeDefs as projectTypeDefs } from './projects'
import { ratingTypeDefs, ratingResolvers } from './ratings'
import { inviteTypeDef, inviteResolvers } from './project-invite'
import { NamesByYear, resolvers as NamesByYearResolver } from './queries/names-by-year'
import { CreateProject, resolvers as CreateProjectResolver } from './mutations/create-project'
import { NameTypeDef, resolvers as NameResolver } from './queries/name'
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

const resolvers = [
  projectResolvers,
  ratingResolvers,
  inviteResolvers,
  NamesByYearResolver,
  NameResolver,
  CreateProjectResolver,
]

const types = [
  initialTypeDefs,
  projectTypeDefs,
  ratingTypeDefs,
  inviteTypeDef,
  NamesByYear,
  NameTypeDef,
  CreateProject,
  ...typeDefs,
]

export const schema = makeExecutableSchema({ typeDefs: types, resolvers: resolvers })
