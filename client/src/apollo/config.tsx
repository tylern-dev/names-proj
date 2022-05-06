import React, { ReactNode } from 'react'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { auth } from '../authentication/config'

// TODO: create error link. If there is an 401 error, redirect to login

const httpLink = createHttpLink({
  uri: import.meta.env.CLIENT_GRAPHQL_URL,
  credentials: 'same-origin',
})

const authLink = setContext(async (_, { headers }) => {
  const authToken = await auth.currentUser?.getIdToken()

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : '',
    },
  }
})

const client = new ApolloClient({
  // link: authLink.concat(httpLink, errorLink),
  link: ApolloLink.from([authLink, httpLink]),
  // uri: import.meta.env.CLIENT_GRAPHQL_URL,
  cache: new InMemoryCache(),
})

const ApolloGraphQLProvider = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloGraphQLProvider
