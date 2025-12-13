import { render, screen } from '@testing-library/react'

import App from './App'

describe('App component', () => {
  it('renders the application with routing', () => {
    render(<App />)
    const lobbyHeading = screen.getByText(/Multiplayer Tetris/i)

    expect(lobbyHeading).toBeInTheDocument()
  })
})