import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './component/Home'

import Cart from './component/Cart'
import Login from './component/Login'
import Signup from './component/Signup'
import Checkout from './component/Checkout'
import Product from './component/product/Product'
import { Bill } from './component/Bill'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/product' element={<Product/>}></Route>
      <Route path='/cart/:id' element={<Cart/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/checkout/:id' element={<Checkout/>}></Route>
      <Route path='/bill/:id' element={<Bill/>}></Route>
     </Routes>
    </>
  )
}

export default App
