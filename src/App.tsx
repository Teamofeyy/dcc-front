import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import Deliveries from './pages/Deliveries'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deliveries" element={<Deliveries />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
