import React, { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ApolloGraphQLProvider from './apollo/config'
import { AuthProvider } from './hooks/AuthProvider'
import ClientRoutes from './ClientRoutes'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ApolloGraphQLProvider>{children}</ApolloGraphQLProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
const App = () => {
  return (
    <Providers>
      <ClientRoutes />
    </Providers>
  )
}

export default App
