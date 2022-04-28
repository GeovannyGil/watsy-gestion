import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Gestiones from './pages/Gestiones'
import Welcome from './pages/Welcome'
import LoginView from './pages/LoginView'
import Clients from './pages/Clients'
import SignOut from './pages/SignOut'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<LoginView />} />
      <Route path='login' element={<LoginView />} />
      <Route path='welcome' element={<Welcome />} />
      <Route path='clients' element={<Clients />} />
      <Route path='signout' element={<SignOut />} />
      <Route path='gestiones' element={<Gestiones />} />
      <Route path='gestiones/:docId' element={<Gestiones />} />
    </Routes>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(// console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
