import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Navbar from './components/navbar'
import Footer from './components/footer'
import SideBar from './components/sideBar'

import Home from './pages/home'
import UnidadAdministrativa from './pages/unidadAdministrativa'
import Oficina from './pages/oficina'
import ActivosFijos from './pages/activosFijos'
import Administrativa from './pages/administrativa'
import Recursos from './pages/recursos'
import Transferencia from './pages/transferencia'

function App() {
  const [count, setCount] = useState(0)
  const basename = process.env.NODE_ENV === 'production' ? '/react313g1' : '/'

  return (
    <BrowserRouter basename={basename}>
      <Header />  
      <Navbar />   
      <div className="main">
        <div>
          <SideBar />
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/unidad-administrativa" element={<UnidadAdministrativa />} />
            <Route path="/administrativa" element={<Administrativa />} />
            <Route path="/recursos" element={<Recursos />} />
            <Route path="/activos-fijos" element={<ActivosFijos />} />
            <Route path="/transferencia" element={<Transferencia />} />
            <Route path="/oficina" element={<Oficina />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
