import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import Button from './Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()

    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with primary variant by default', () => {
    render(<Button>Primary Button</Button>)
    const button = screen.getByText('Primary Button')

    expect(button).toHaveStyle({ backgroundColor: '#3b82f6' })
  })

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>)
    const button = screen.getByText('Secondary Button')

    expect(button).toHaveStyle({ backgroundColor: '#6b7280' })
  })

  it('applies custom styles', () => {
    render(
      <Button style={{ marginTop: '20px' }}>Styled Button</Button>
    )
    const button = screen.getByText('Styled Button')

    expect(button).toHaveStyle({ marginTop: '20px' })
  })

  it('renders without onClick handler', () => {
    render(<Button>No Handler</Button>)
    const button = screen.getByText('No Handler')

    expect(button).toBeInTheDocument()
    fireEvent.click(button)
  })
})
