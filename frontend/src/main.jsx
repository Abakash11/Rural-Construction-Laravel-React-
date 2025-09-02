import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { AuthProvider } from './components/backend/context/Auth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
      <ToastContainer position= "top-center" theme= "colored"/>
    </BrowserRouter>
    
  </StrictMode>,
)
