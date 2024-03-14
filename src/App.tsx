import { useSelector } from 'react-redux'
import { RootState } from './store'

import './App.css'
// import Welcome from './pages/Welcome/Welcome'
import Chat from './pages/Chat/Chat'

function App() {
  const {  theme } = useSelector((state: RootState) => state.user)

  return (
    <main className={`app-wrapper ${theme === 'light' ? 'light' : 'dark'}`}>
      
        <Chat />
       
      
    </main>
  )
}

export default App
