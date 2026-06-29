import { render, screen, fireEvent } from '@testing-library/react'
import Hero from './Hero'

describe('Hero Component', () => {
  test('renders main heading', () => {
    render(<Hero onSubmit={() => {}} />)
    const heading = screen.getByText(/让每一家企业/)
    expect(heading).toBeInTheDocument()
  })

  test('renders subheading', () => {
    render(<Hero onSubmit={() => {}} />)
    const subheading = screen.getByText(/输入企业名称，AI智能分析匹配/)
    expect(subheading).toBeInTheDocument()
  })

  test('renders search input with placeholder', () => {
    render(<Hero onSubmit={() => {}} />)
    const input = screen.getByPlaceholderText(/输入企业名称，快速匹配政策补贴/)
    expect(input).toBeInTheDocument()
  })

  test('calls onSubmit when form is submitted with input value', () => {
    const handleSubmit = vi.fn()
    render(<Hero onSubmit={handleSubmit} />)
    const input = screen.getByPlaceholderText(/输入企业名称/)
    fireEvent.change(input, { target: { value: '腾讯科技' } })
    const button = screen.getByText('立即查询')
    fireEvent.click(button)
    expect(handleSubmit).toHaveBeenCalledWith('腾讯科技')
  })

  test('does not call onSubmit when input is empty', () => {
    const handleSubmit = vi.fn()
    render(<Hero onSubmit={handleSubmit} />)
    const button = screen.getByText('立即查询')
    fireEvent.click(button)
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  test('renders statistics cards', () => {
    render(<Hero onSubmit={() => {}} />)
    expect(screen.getByText('10,000+')).toBeInTheDocument()
    expect(screen.getByText('50亿+')).toBeInTheDocument()
    expect(screen.getByText('85%')).toBeInTheDocument()
  })

  test('renders DropZone component', () => {
    render(<Hero onSubmit={() => {}} />)
    const dropZone = screen.getByText(/拖拽 BP/)
    expect(dropZone).toBeInTheDocument()
  })
})