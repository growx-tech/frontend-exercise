import './App.css'
import Wrapper from '../src/components/Wrapper'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
  return (
    <Provider store={store}>
      <Wrapper />
    </Provider>
  )
}

export default App
