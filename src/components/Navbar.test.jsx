import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from './Navbar'
import { useStore } from '../store/useStore'

vi.mock('../store/useStore', () => ({
  useStore: vi.fn(() => ({ 
    theme: 'light', 
    toggleTheme: vi.fn(), 
    user: null 
  }))
}))

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(() => ({ t: (key) => key, i18n: { language: 'zh', changeLanguage: vi.fn() } }))
}))

describe('Navbar Component', () => {
  test('renders logo', () => {
    render(<Navbar onStart={() => {}} />)
    expect(screen.getByText('企服雷达')).toBeInTheDocument()
  })

  test('renders navigation links', () => {
    render(<Navbar onStart={() => {}} />)
    expect(screen.getByText('policySearch')).toBeInTheDocument()
    expect(screen.getByText('features')).toBeInTheDocument()
    expect(screen.getByText('about')).toBeInTheDocument()
  })

  test('renders login button when not logged in', () => {
    render(<Navbar onStart={() => {}} />)
    expect(screen.getByText('login')).toBeInTheDocument()
  })

  test('calls onLoginClick when login button is clicked', () => {
    const handleLoginClick = vi.fn()
    render(<Navbar onStart={() => {}} onLoginClick={handleLoginClick} />)
    const loginButton = screen.getByText('login')
    fireEvent.click(loginButton)
    expect(handleLoginClick).toHaveBeenCalledTimes(1)
  })

  test('calls onSearchClick when policySearch is clicked', () => {
    const handleSearchClick = vi.fn()
    render(<Navbar onStart={() => {}} onSearchClick={handleSearchClick} />)
    const searchLink = screen.getByText('policySearch')
    fireEvent.click(searchLink)
    expect(handleSearchClick).toHaveBeenCalledTimes(1)
  })

  test('calls onStart when start button is clicked', () => {
    const handleStart = vi.fn()
    render(<Navbar onStart={handleStart} />)
    const startButton = screen.getByText('start')
    fireEvent.click(startButton)
    expect(handleStart).toHaveBeenCalledTimes(1)
  })

  test('renders theme toggle button', () => {
    render(<Navbar onStart={() => {}} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(5)
  })
})