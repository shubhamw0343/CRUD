import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './Home'
import './App.css'
import CreateStudent from './CreateStudent'
import Update from './Update'
import View from './Veiwed'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateStudent />} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='/view/:id' element={<View/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
