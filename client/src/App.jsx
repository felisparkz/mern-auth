import {Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from "./pages/home/Home"
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import axios from 'axios'
import  { Toaster } from 'react-hot-toast';
import {  UserContextProvider } from './context/userContext'
import Dashboard from './pages/dashboard/Dashboard'


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true


function App() {

  return (

      <UserContextProvider>
        <Navbar />
        <Toaster position='top-left' toastOptions={{duration: 2000}}/>
        <Routes>
          <Route path= '/' element={<Home />}/>
          <Route path= '/register' element={<Register />}/>
          <Route path= '/login' element={<Login />}/>
          <Route path= '/dashboard' element={<Dashboard />}/>
        </Routes>
        </UserContextProvider>
      
  
  )
}

export default App
