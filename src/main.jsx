import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Import global css if needed, here we are using module CSS
// But we might want some simple global reset
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
