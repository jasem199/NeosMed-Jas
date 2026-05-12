import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import AdminDashboard from './screens/AdminDashboard/AdminDashboard.jsx'
import { initTheme } from './utils/theme.js'

// Initialize the primary color theme from localStorage
initTheme();

const path = window.location.pathname;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {path === '/admin-dashboard' ? <AdminDashboard /> : <App />}
  </StrictMode>,
)
