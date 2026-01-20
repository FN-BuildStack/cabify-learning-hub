import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App' // Asume que tu App principal está dentro de la carpeta 'app'
import './styles/index.css' // O el nombre de tu archivo CSS si existe

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)