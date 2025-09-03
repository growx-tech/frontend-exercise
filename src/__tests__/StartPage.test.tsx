import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import StartPage from '../components/StartPage'
import { GameProvider } from '../context/GameContext'

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn()
  }
})

const StartPageWithProviders = () => (
  <GameProvider>
    <BrowserRouter>
      <StartPage />
    </BrowserRouter>
  </GameProvider>
)

describe('StartPage', () => {
  it('should render the start page with input and button', () => {
    render(<StartPageWithProviders />)

    expect(screen.getByText('Memory Game Challenge')).toBeInTheDocument()
    expect(screen.getByLabelText('Enter your name:')).toBeInTheDocument()
    expect(screen.getByLabelText('Choose difficulty:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start Game' })).toBeInTheDocument()
  })

  it('should disable start button when name is empty', () => {
    render(<StartPageWithProviders />)

    const startButton = screen.getByRole('button', { name: 'Start Game' })
    expect(startButton).toBeDisabled()
  })

  it('should enable start button when name is entered', () => {
    render(<StartPageWithProviders />)

    const nameInput = screen.getByLabelText('Enter your name:')
    const startButton = screen.getByRole('button', { name: 'Start Game' })

    fireEvent.change(nameInput, { target: { value: 'Test Player' } })

    expect(startButton).not.toBeDisabled()
  })
})
