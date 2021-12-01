import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { DateTimeTypeDefinition } from 'graphql-scalars'
import { resolvers as projectResolvers, typeDefs as projectTypeDefs } from './projects'
import { ratingTypeDefs, ratingResolvers } from './ratings'
import { inviteTypeDef, inviteResolvers } from './project-invite'
import { NamesByYear, resolvers as NamesByYearResolver } from './queries/names-by-year'
import { CreateProject, resolvers as CreateProjectResolver } from './mutations/create-project'
import { NameTypeDef, resolvers as NameResolver } from './queries/name'
import { Projects, resolvers as ProjectsResolver } from './queries/projects'
import { Project, resolvers as ProjectResolvers } from './queries/project'
import { DeactivateProject, resolvers as DeactivateProjectResolvers } from './mutations/deactivate-project'
import { ActivateProject, resolvers as ActivateProjectResolvers } from './mutations/activate-project'
import { AddNameToProject, resovers as AddNameToProjectResolvers } from './mutations/add-name-to-project'
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
  ProjectsResolver,
  ProjectResolvers,
  ActivateProjectResolvers,
  DeactivateProjectResolvers,
  AddNameToProjectResolvers,
]

const scalarTypes = [DateTimeTypeDefinition]

const types = [
  initialTypeDefs,
  projectTypeDefs,
  ratingTypeDefs,
  inviteTypeDef,
  NamesByYear,
  NameTypeDef,
  CreateProject,
  Projects,
  Project,
  DeactivateProject,
  ActivateProject,
  AddNameToProject,
  ...scalarTypes,
  ...typeDefs,
]

export const schema = makeExecutableSchema({ typeDefs: types, resolvers: resolvers })
