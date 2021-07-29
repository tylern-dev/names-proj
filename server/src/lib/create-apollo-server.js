import { ApolloServer, gql } from 'apollo-server-express'
import apolloServerContext from './apollo-server-context'
import depthLimit from 'graphql-depth-limit'
import apolloServerFormatError from './apollo-server-format-error'
import { mergedResolvers, mergedTypeDefs } from '../graphql/create-schema'

// const testDef = gql`
//   type Query {
//     void: String
//   }

//   type Mutation {
//     void: String
//   }
// `

// const resolvers = {
//   Query: {
//     void: () => {},
//   },
//   Mutation: {
//     void: () => {},
//   },
// }

const createApolloServer = async () => {
  return new ApolloServer({
    introspection: true,
    playground: true,
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
