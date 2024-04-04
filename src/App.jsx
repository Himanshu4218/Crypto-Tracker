import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Alert from './components/Alert.jsx'
import { lazy,Suspense } from 'react'
import './App.css'
import Spinner from './components/Spinner.jsx'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const CoinPage = lazy(() => import('./pages/CoinPage.jsx'))

function App() {

  return (
    <BrowserRouter>
      <div>
        <Header/>
          <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='coins/:id' element={<CoinPage/>} />
            </Routes>
          </Suspense>
      </div>
      <Alert/>
    </BrowserRouter>
  )
}

export default App
