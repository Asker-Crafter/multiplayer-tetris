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

    expect(button).toBeInTheDocument()
    expect(button.tagName).toBe('BUTTON')
    expect(button.className).toBeTruthy()
  })

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>)
    const button = screen.getByText('Secondary Button')

    expect(button).toBeInTheDocument()
    expect(button.tagName).toBe('BUTTON')
    expect(button.className).toBeTruthy()
  })

  it('applies custom className', () => {
    render(
      <Button className="custom-class">Styled Button</Button>
    )
    const button = screen.getByText('Styled Button')

    expect(button).toBeInTheDocument()
    expect(button.className).toContain('custom-class')
  })

  it('renders without onClick handler', () => {
    render(<Button>No Handler</Button>)
    const button = screen.getByText('No Handler')

    expect(button).toBeInTheDocument()
    fireEvent.click(button)
  })
})
