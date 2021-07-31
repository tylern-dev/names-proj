import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { resolvers as nameResolvers, typeDefs as nameTypeDefs } from './names'

const resolvers = [nameResolvers]

const types = [nameTypeDefs]

export const mergedResolvers = mergeResolvers(resolvers)
export const mergedTypeDefs = mergeTypeDefs(types)
