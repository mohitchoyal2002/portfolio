import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'

const App = () => {
  return (
    <div className='bg-sky-100'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App