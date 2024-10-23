import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CustomerState from './context/customer/CustomerState.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomerState>
    <App />
    </CustomerState>
  </React.StrictMode>,
)
