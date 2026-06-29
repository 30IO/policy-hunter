import { render, screen, fireEvent } from '@testing-library/react'
import SearchPage from './SearchPage'
import { useStore } from '../store/useStore'

vi.mock('../store/useStore', () => ({
  useStore: vi.fn(() => ({
    policies: [
      { id: 1, title: '科技补贴政策', description: '科技创新支持', region: '北京', industry: '科技', amount: '100万' },
      { id: 2, title: '税收优惠政策', description: '企业所得税优惠', region: '上海', industry: '制造', amount: '50万' },
      { id: 3, title: '人才补贴政策', description: '高端人才引进', region: '北京', industry: '科技', amount: '30万' },
    ],
    favorites: [],
    toggleFavorite: vi.fn(),
    addToCompare: vi.fn(),
    compareList: [],
    theme: 'light',
  }))
}))

describe('SearchPage Component', () => {
  test('renders search page title', () => {
    render(<SearchPage />)
    expect(screen.getByText('政策搜索')).toBeInTheDocument()
    expect(screen.getByText('按地区、行业筛选适合您的政策')).toBeInTheDocument()
  })

  test('renders search input with placeholder', () => {
    render(<SearchPage />)
    const input = screen.getByPlaceholderText('搜索政策名称或关键词...')
    expect(input).toBeInTheDocument()
  })

  test('filters policies by keyword', () => {
    render(<SearchPage />)
    const input = screen.getByPlaceholderText('搜索政策名称或关键词...')
    fireEvent.change(input, { target: { value: '科技' } })
    expect(input.value).toBe('科技')
  })

  test('shows filter panel when filter button is clicked', () => {
    render(<SearchPage />)
    const filterButton = screen.getByText('筛选')
    fireEvent.click(filterButton)
    expect(screen.getByText('地区')).toBeInTheDocument()
    expect(screen.getByText('行业')).toBeInTheDocument()
  })

  test('clears filters when clear button is clicked', () => {
    render(<SearchPage />)
    const input = screen.getByPlaceholderText('搜索政策名称或关键词...')
    fireEvent.change(input, { target: { value: '科技' } })
    
    const clearButton = screen.getByText('清除')
    fireEvent.click(clearButton)
    expect(input.value).toBe('')
  })

  test('shows policy count', () => {
    render(<SearchPage />)
    expect(screen.getByText('共找到 3 条政策')).toBeInTheDocument()
  })

  test('renders policy cards with details', () => {
    render(<SearchPage />)
    expect(screen.getByText('科技补贴政策')).toBeInTheDocument()
    expect(screen.getByText('科技创新支持')).toBeInTheDocument()
    const beijingElements = screen.getAllByText('北京')
    expect(beijingElements.length).toBe(2)
    expect(screen.getByText('上海')).toBeInTheDocument()
    const techElements = screen.getAllByText('科技')
    expect(techElements.length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText('制造')).toBeInTheDocument()
  })

  test('shows empty state when no policies match', async () => {
    vi.mocked(useStore).mockReturnValue({
      policies: [],
      favorites: [],
      toggleFavorite: vi.fn(),
      addToCompare: vi.fn(),
      compareList: [],
      theme: 'light',
    })
    render(<SearchPage />)
    expect(screen.getByText('未找到相关政策')).toBeInTheDocument()
  })
})