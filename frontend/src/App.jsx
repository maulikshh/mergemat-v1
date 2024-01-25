import { useState } from 'react'
import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/landing'
import Login from '../src/pages/login'
import Register from './pages/Register'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './appcontext/Authcontext'
import Dashboard from './pages/Dashboard'
import Content from './pages/content'
import Group from './pages/Group'
import Video from './pages/video'
import ContentIn from './pages/content-in'
import ForgotPassword from './pages/ForgotPassword'
import PrivateRoute from './config/Privateroute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <Toaster position='bottom-right' toastOptions={{duration:2000}} />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotpassword' element={<ForgotPassword/>} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/content' element={<PrivateRoute><Content /></PrivateRoute>} />
        <Route path='/group' element={<PrivateRoute><Group/></PrivateRoute>} />
        <Route path='/video' element={<PrivateRoute><Video/></PrivateRoute>} />
        <Route path='/content-in' element={<PrivateRoute><ContentIn/></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  )
}

export default App;
