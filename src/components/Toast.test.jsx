import { render, screen, fireEvent } from '@testing-library/react'
import Toast from './Toast'
import { useStore } from '../store/useStore'

vi.mock('../store/useStore', () => ({
  useStore: vi.fn(() => ({
    toast: null,
    hideToast: vi.fn()
  }))
}))

describe('Toast Component', () => {
  test('does not render when toast is null', () => {
    const { container } = render(<Toast />)
    expect(container.firstChild).toBeNull()
  })

  test('renders success toast', () => {
    useStore.mockReturnValue({
      toast: { type: 'success', message: 'Success message' },
      hideToast: vi.fn(),
      theme: 'light'
    })
    render(<Toast />)
    expect(screen.getByText('Success message')).toBeInTheDocument()
  })

  test('renders error toast', () => {
    useStore.mockReturnValue({
      toast: { type: 'error', message: 'Error message' },
      hideToast: vi.fn(),
      theme: 'light'
    })
    render(<Toast />)
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })

  test('renders warning toast', () => {
    useStore.mockReturnValue({
      toast: { type: 'warning', message: 'Warning message' },
      hideToast: vi.fn(),
      theme: 'light'
    })
    render(<Toast />)
    expect(screen.getByText('Warning message')).toBeInTheDocument()
  })

  test('renders info toast as default', () => {
    useStore.mockReturnValue({
      toast: { type: 'unknown', message: 'Info message' },
      hideToast: vi.fn(),
      theme: 'light'
    })
    render(<Toast />)
    expect(screen.getByText('Info message')).toBeInTheDocument()
  })

  test('calls hideToast when close button is clicked', () => {
    const hideToast = vi.fn()
    useStore.mockReturnValue({
      toast: { type: 'success', message: 'Test' },
      hideToast,
      theme: 'light'
    })
    render(<Toast />)
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    expect(hideToast).toHaveBeenCalledTimes(1)
  })
})
