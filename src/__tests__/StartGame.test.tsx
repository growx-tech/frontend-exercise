import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import StartGame from '../components/StartGame'
import { Pages } from '../common/models'

const mockStore = configureStore([])

describe('StartGame Component', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any

  beforeEach(() => {
    store = mockStore({
      user: { name: '', email: '' },
      game: { gridSize: 4, enableMove: false, pages: Pages.StartGame }
    })
    store.dispatch = jest.fn()
  })

  function renderWithStore() {
    return render(
      <Provider store={store}>
        <StartGame />
      </Provider>
    )
  }

  it('renders all input fields and button', () => {
    renderWithStore()
    expect(screen.getByLabelText(/FullName/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Grid Size/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Limited Move/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Play/i })).toBeDisabled()
  })

  it('dispatches setUser when typing name', () => {
    renderWithStore()
    fireEvent.change(screen.getByLabelText(/FullName/i), { target: { value: 'himansh' } })
    expect(store.dispatch).toHaveBeenCalled()
  })

  it('update grid size', () => {
    renderWithStore()
    fireEvent.change(screen.getByLabelText(/Grid Size/i), { target: { value: '6' } })
    expect(store.dispatch).toHaveBeenCalled()
  })

  it('limited moves toggle button', () => {
    renderWithStore()
    fireEvent.click(screen.getByLabelText(/Limited Moves/i))
    expect(store.dispatch).toHaveBeenCalled()
  })
})
