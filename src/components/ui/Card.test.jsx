import { render, screen, fireEvent } from '@testing-library/react'
import Card, { CardHeader, CardBody, CardFooter } from './Card'

describe('Card Component', () => {
  test('renders basic card', () => {
    render(<Card>Card Content</Card>)
    const card = screen.getByText('Card Content')
    expect(card).toBeInTheDocument()
    expect(card.parentElement).toBeInTheDocument()
  })

  test('renders card with hover effect', () => {
    render(<Card hover>Hover Card</Card>)
    const card = screen.getByText('Hover Card')
    expect(card).toBeInTheDocument()
  })

  test('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Card onClick={handleClick}>Clickable Card</Card>)
    const card = screen.getByText('Clickable Card')
    fireEvent.click(card)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('renders CardHeader component', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
      </Card>
    )
    const header = screen.getByText('Header')
    expect(header).toBeInTheDocument()
  })

  test('renders CardBody component', () => {
    render(
      <Card>
        <CardBody>Body</CardBody>
      </Card>
    )
    const body = screen.getByText('Body')
    expect(body).toBeInTheDocument()
  })

  test('renders CardFooter component', () => {
    render(
      <Card>
        <CardFooter>Footer</CardFooter>
      </Card>
    )
    const footer = screen.getByText('Footer')
    expect(footer).toBeInTheDocument()
  })
})
