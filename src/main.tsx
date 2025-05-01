
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './hooks/use-theme'
import { DeviceProvider } from './hooks/use-mobile'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <DeviceProvider>
        <App />
      </DeviceProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
