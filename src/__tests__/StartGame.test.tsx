import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import StartGame from '../components/StartGame'
import { Pages } from '../common/models'
import { setGridSize, setEnableMove, setPages } from '../store/gameSlice'
import growy_logo from '../../public/growy_logo.svg'

const mockStore = configureStore([])

describe('StartGame Component', () => {
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
    expect(screen.getByRole('button', { name: /Let\'s play/i })).toBeDisabled()
  })
})
