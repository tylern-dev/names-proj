import { ApolloError } from 'apollo-server-errors'

export const apolloError = (message: string) => {
  throw new ApolloError(message)
}
