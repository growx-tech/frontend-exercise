import growyLogo from '/growy_logo.svg'
import './App.css'
import PlayGame from './components/PlayGame'
import Wrapper from '../src/components/Wrapper'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
  return (
    <Provider store={store}>
      <Wrapper/>
    </Provider>
  )
}

export default App
