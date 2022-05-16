import styled from 'styled-components'

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  /* flex-flow: column nowrap; */
  width: 100vw;
  min-height: 100%;
  margin: 0 auto;

  &::after {
    content: '';
  }
`
