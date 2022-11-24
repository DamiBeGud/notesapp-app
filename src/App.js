import Login from './pages/Login'
import Register from './pages/Register'
import User from './pages/User'
import Calendar from './pages/Calendar'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/user/:userId' element={<User/>} />
      <Route path='/user/:userId/valendar' element={<Calendar/>} />



    </Routes>
  </BrowserRouter>
  )
}

export default App;
