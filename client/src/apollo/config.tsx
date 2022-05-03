import React, { ReactNode } from 'react'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Cookies from 'js-cookie'

const httpLink = createHttpLink({
  uri: import.meta.env.CLIENT_GRAPHQL_URL,
  credentials: 'same-origin',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const authToken = Cookies.get('token')
  console.log(authToken)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: import.meta.env.CLIENT_GRAPHQL_URL,
  cache: new InMemoryCache(),
})

const ApolloGraphQLProvider = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloGraphQLProvider
