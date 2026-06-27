import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'
import { useStore } from '../../store/useStore'

vi.mock('../../store/useStore', () => ({
  useStore: vi.fn(() => ({ theme: 'light' }))
}))

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Click Me</Button>)
    const button = screen.getByText('Click Me')
    expect(button).toBeInTheDocument()
    expect(button.tagName).toBe('BUTTON')
  })

  test('renders with variant secondary', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByText('Secondary')
    expect(button).toBeInTheDocument()
  })

  test('renders with variant outline', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByText('Outline')
    expect(button).toBeInTheDocument()
  })

  test('renders with size sm', () => {
    render(<Button size="sm">Small</Button>)
    const button = screen.getByText('Small')
    expect(button).toBeInTheDocument()
  })

  test('renders with size lg', () => {
    render(<Button size="lg">Large</Button>)
    const button = screen.getByText('Large')
    expect(button).toBeInTheDocument()
  })

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByText('Disabled')
    expect(button).toBeDisabled()
  })

  test('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Clickable</Button>)
    const button = screen.getByText('Clickable')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
