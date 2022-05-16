import React from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import { GlobalStyles } from './theme/GlobalStyles'
import { theme } from './theme/theme'

const container = document.getElementById('root')
const root = createRoot(container as HTMLElement)
root.render(
  <React.StrictMode>
    {/* <GlobalStyles /> */}
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
