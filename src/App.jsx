// library for routing functionality (Lets pages load w/o refreshing)
import { Route, Routes } from 'react-router-dom'

// CSS
import './styles/fonts.css'
import './styles/main.css'

// relative HTML
import Navbar from './static_content/Navbar'
import Game from './pages/Game'
import Home from './pages/Home'
import Rules from './pages/Rules'
import Footer from './static_content/Footer'

function App () {
  return (
    <div>
      <Navbar />
      <div id='page-container'>
        <div id='content-wrap'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/game' element={<Game />} />
            <Route path='/rules' element={<Rules />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App
