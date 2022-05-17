import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import Login from './Login'
import * as useAuthContext from '../../hooks/AuthProvider'
import { Router } from 'react-router-dom'

describe('<Login /> Component', () => {
  it('should navigate to dashboard if ', async () => {
    jest.spyOn(useAuthContext, 'useAuthContext').mockReturnValue({
      isAuthenticated: false,
      handleSetIsAuthenticated: () => undefined,
      loading: false,
      handleSignOut: () => undefined,
    })
    const history = createMemoryHistory()
    const RenderTree = (
      <Router location={history.location} navigator={history}>
        <Login />
      </Router>
    )

    render(RenderTree)
    const input = await screen.findByLabelText(/email/i)
    expect(input).toBeInTheDocument()
  })
})
