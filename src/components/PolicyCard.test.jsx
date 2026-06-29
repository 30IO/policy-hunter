import { render, screen, fireEvent } from '@testing-library/react'
import PolicyCard from './PolicyCard'
import { useStore } from '../store/useStore'

vi.mock('../store/useStore', () => ({
  useStore: vi.fn(() => ({
    compareList: [],
    toggleCompare: vi.fn(),
  }))
}))

const mockPolicy = {
  id: 1,
  name: '科技补贴政策',
  category: '科技创新',
  matchRate: 95,
  amount: '100万',
  deadline: '2024-12-31',
}

describe('PolicyCard Component', () => {
  test('renders policy details', () => {
    render(<PolicyCard policy={mockPolicy} onClick={() => {}} />)
    expect(screen.getByText('科技补贴政策')).toBeInTheDocument()
    expect(screen.getByText('¥100万')).toBeInTheDocument()
    expect(screen.getByText('截止: 2024-12-31')).toBeInTheDocument()
  })

  test('renders category badge', () => {
    render(<PolicyCard policy={mockPolicy} onClick={() => {}} />)
    expect(screen.getByText('科技创新')).toBeInTheDocument()
  })

  test('renders match rate badge and progress bar', () => {
    render(<PolicyCard policy={mockPolicy} onClick={() => {}} />)
    expect(screen.getByText('高匹配')).toBeInTheDocument()
    expect(screen.getByText('95%')).toBeInTheDocument()
  })

  test('calls onClick when card is clicked', () => {
    const handleClick = vi.fn()
    render(<PolicyCard policy={mockPolicy} onClick={handleClick} />)
    const card = screen.getByText('科技补贴政策').closest('div')
    fireEvent.click(card)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('calls toggleCompare when compare button is clicked', () => {
    const handleToggle = vi.fn()
    vi.mocked(useStore).mockReturnValue({
      compareList: [],
      toggleCompare: handleToggle,
    })
    render(<PolicyCard policy={mockPolicy} onClick={() => {}} />)
    const compareButton = screen.getByTitle('添加对比')
    fireEvent.click(compareButton)
    expect(handleToggle).toHaveBeenCalledWith(1)
  })

  test('shows "取消对比" title when policy is in compare list', () => {
    vi.mocked(useStore).mockReturnValue({
      compareList: [1],
      toggleCompare: vi.fn(),
    })
    render(<PolicyCard policy={mockPolicy} onClick={() => {}} />)
    const compareButton = screen.getByTitle('取消对比')
    expect(compareButton).toBeInTheDocument()
  })

  test('renders different match badges based on match rate', () => {
    const midPolicy = { ...mockPolicy, matchRate: 75, category: '税收优惠' }
    const lowPolicy = { ...mockPolicy, matchRate: 60, category: '其他' }
    
    render(<PolicyCard policy={midPolicy} onClick={() => {}} />)
    expect(screen.getByText('中匹配')).toBeInTheDocument()
    
    render(<PolicyCard policy={lowPolicy} onClick={() => {}} />)
    expect(screen.getByText('待评估')).toBeInTheDocument()
  })
})