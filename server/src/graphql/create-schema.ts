import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers as nameResolvers, typeDefs as nameTypeDefs } from './baby-names'
import { resolvers as projectResolvers, typeDefs as projectTypeDefs } from './projects'

const resolvers = [nameResolvers, projectResolvers]

const types = [nameTypeDefs, projectTypeDefs]

// export const mergedResolvers = mergeResolvers(resolvers)
// export const mergedTypeDefs = mergeTypeDefs(types)

export const schema = makeExecutableSchema({ typeDefs: types, resolvers: resolvers })
