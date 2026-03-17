
import { BrowserRouter, Routes,Navigate, Route } from 'react-router-dom';
import {Login} from './pages/Login';
import {Admin} from './pages/Admin';
import { ProtectedRoute } from './components/ProtectedRoute';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<ProtectedRoute>
          <Admin/>
        </ProtectedRoute>}/>
        <Route path="*" element={<Navigate to="/login" replace />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
