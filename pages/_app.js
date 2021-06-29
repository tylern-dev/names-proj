import { StrictMode } from 'react'
import NextApp from 'next/app'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from '../theme/global-styles'
import { theme } from '../theme/theme'

export default function App({ Component, pageProps }) {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </StrictMode>
  )
}
