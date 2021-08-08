import { ApolloServer } from 'apollo-server-express'
import apolloServerContext from './apollo-server-context'
import depthLimit from 'graphql-depth-limit'
import apolloServerFormatError from './apollo-server-format-error'
import { mergedResolvers, mergedTypeDefs } from '../graphql/create-schema'

const createApolloServer = async () => {
  return new ApolloServer({
    introspection: true, 
    // schema,
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
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
