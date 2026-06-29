import { render, screen, fireEvent } from '@testing-library/react'
import Results from './Results'
import { useStore } from '../store/useStore'

vi.mock('../store/useStore', () => ({
  useStore: vi.fn(() => ({
    policies: [
      { id: 1, name: '科技补贴政策', category: '科技创新', matchRate: 95, amount: '100万', deadline: '2024-12-31', industry: '科技' },
      { id: 2, name: '税收优惠政策', category: '税收优惠', matchRate: 85, amount: '50万', deadline: '2024-11-30', industry: '制造' },
      { id: 3, name: '人才补贴政策', category: '人才政策', matchRate: 70, amount: '30万', deadline: '2024-10-31', industry: '科技' },
    ],
    compareList: [],
    toggleCompare: vi.fn(),
    theme: 'light',
  }))
}))

describe('Results Component', () => {
  test('renders matching report title', () => {
    render(<Results companyName="腾讯科技" onPolicyClick={() => {}} onGenerateMaterials={() => {}} onCompare={() => {}} />)
    expect(screen.getByText('腾讯科技的政策匹配报告')).toBeInTheDocument()
  })

  test('renders statistics cards', () => {
    render(<Results companyName="" onPolicyClick={() => {}} onGenerateMaterials={() => {}} onCompare={() => {}} />)
    expect(screen.getByText('预估可获补贴总额')).toBeInTheDocument()
    expect(screen.getByText('高匹配度政策数量')).toBeInTheDocument()
    expect(screen.getByText('紧急申报倒计时')).toBeInTheDocument()
  })

  test('renders filter and sort controls', () => {
    render(<Results companyName="" onPolicyClick={() => {}} onGenerateMaterials={() => {}} onCompare={() => {}} />)
    expect(screen.getByText('全部类型')).toBeInTheDocument()
    expect(screen.getByText('匹配度优先')).toBeInTheDocument()
  })

  test('filters policies by category', () => {
    render(<Results companyName="" onPolicyClick={() => {}} onGenerateMaterials={() => {}} onCompare={() => {}} />)
    const filterSelect = screen.getByRole('combobox', { name: /全部类型/ })
    fireEvent.change(filterSelect, { target: { value: '科技' } })
    expect(filterSelect).toHaveValue('科技')
  })

  test('sorts policies by amount', () => {
    render(<Results companyName="" onPolicyClick={() => {}} onGenerateMaterials={() => {}} onCompare={() => {}} />)
    const sortSelect = screen.getByRole('combobox', { name: /匹配度优先/ })
    fireEvent.change(sortSelect, { target: { value: 'amount' } })
    expect(sortSelect).toHaveValue('amount')
  })

  test('calls onGenerateMaterials when button is clicked', () => {
    const handleGenerate = vi.fn()
    render(<Results companyName="" onPolicyClick={() => {}} onGenerateMaterials={handleGenerate} onCompare={() => {}} />)
    const button = screen.getByText('生成完整申报方案')
    fireEvent.click(button)
    expect(handleGenerate).toHaveBeenCalledTimes(1)
  })

  test('renders match highlights', () => {
    render(<Results companyName="" onPolicyClick={() => {}} onGenerateMaterials={() => {}} onCompare={() => {}} />)
    expect(screen.getByText('匹配亮点')).toBeInTheDocument()
    expect(screen.getByText('企业资质符合高新技术企业认定标准')).toBeInTheDocument()
  })

  test('renders trend chart and radar chart', () => {
    render(<Results companyName="" onPolicyClick={() => {}} onGenerateMaterials={() => {}} onCompare={() => {}} />)
    expect(screen.getByText('补贴趋势分析')).toBeInTheDocument()
    expect(screen.getByText('匹配度雷达图')).toBeInTheDocument()
  })
})