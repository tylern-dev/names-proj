import { ApolloServer } from 'apollo-server-express'
import apolloServerContext from './apollo-server-context'
import depthLimit from 'graphql-depth-limit'
import apolloServerFormatError from './apollo-server-format-error'
import { schema } from '../graphql/create-schema'
import { applyMiddleware } from 'graphql-middleware'
import permissions from '../auth/permissions'
const createApolloServer = async () => {
  return new ApolloServer({
    introspection: true,
    schema: applyMiddleware(schema, permissions),
    // typeDefs: mergedTypeDefs,
    // resolvers: mergedResolvers,
    context: apolloServerContext,
    // dataSources
    validationRules: [depthLimit(8)],
    formatError: apolloServerFormatError,
    // plugins: [
    //   OpentracingPlugin({
    //     server: tracer,
    //     local: tracer,
    //   }),
    // ],
  })
}

export default createApolloServer
