import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import LaporanPage from './pages/LaporanPage'
import ListPembelian from './pages/ListPembelian'
import FormStockBaru from './pages/FormStockBaru'
import Penjualan from './pages/Penjualan'
import FormBarangBaru from './pages/FormBarangBaru'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/formStock' element={<FormBarangBaru/>}/>
        <Route path='/formBarang' element={<FormStockBaru/>}/>
        <Route path='/penjualan' element={<Penjualan/>}/>
        <Route path='/pembelian' element={<ListPembelian/>}/>
        <Route path='/laporan' element={<LaporanPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
