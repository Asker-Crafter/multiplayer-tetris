import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import Modal from './Modal'

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false}>
        <div>Modal Content</div>
      </Modal>
    )
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
  })

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true}>
        <div>Modal Content</div>
      </Modal>
    )
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(
      <Modal isOpen={true} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    )
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
  })

  it('does not render title when not provided', () => {
    render(
      <Modal isOpen={true}>
        <div>Modal Content</div>
      </Modal>
    )
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('calls onClose when overlay is clicked', () => {
    const handleClose = jest.fn()
    const { container } = render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    )
    // Клик на фон (первый div)
    const backdrop = container.firstChild as HTMLElement

    fireEvent.click(backdrop)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn()

    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    )
    const closeButton = screen.getByText('×')

    fireEvent.click(closeButton)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('does not render close button when onClose is not provided', () => {
    render(
      <Modal isOpen={true}>
        <div>Modal Content</div>
      </Modal>
    )
    expect(screen.queryByText('×')).not.toBeInTheDocument()
  })

  it('does not call onClose when modal content is clicked', () => {
    const handleClose = jest.fn()

    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    )
    const content = screen.getByText('Modal Content')

    fireEvent.click(content)
    expect(handleClose).not.toHaveBeenCalled()
  })
})
