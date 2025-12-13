import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import Grid from './Grid'

describe('Grid', () => {
  it('renders children correctly', () => {
    render(
      <Grid>
        <div>Child 1</div>
        <div>Child 2</div>
      </Grid>
    )
    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
  })

  it('uses 2 columns by default', () => {
    const { container } = render(
      <Grid>
        <div>Child 1</div>
      </Grid>
    )
    const grid = container.querySelector('.grid')

    expect(grid).toHaveStyle({ gridTemplateColumns: 'repeat(2, 1fr)' })
  })

  it('uses custom number of columns', () => {
    const { container } = render(
      <Grid columns={3}>
        <div>Child 1</div>
      </Grid>
    )
    const grid = container.querySelector('.grid')

    expect(grid).toHaveStyle({ gridTemplateColumns: 'repeat(3, 1fr)' })
  })

  it('renders with single column', () => {
    const { container } = render(
      <Grid columns={1}>
        <div>Single Child</div>
      </Grid>
    )
    const grid = container.querySelector('.grid')

    expect(grid).toHaveStyle({ gridTemplateColumns: 'repeat(1, 1fr)' })
  })

  it('renders multiple children in grid', () => {
    render(
      <Grid columns={4}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Grid>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
    expect(screen.getByText('Item 4')).toBeInTheDocument()
  })
})
