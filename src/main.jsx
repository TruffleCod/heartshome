import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { applyInputMode, readInputMode, watchInputModeViewport } from './utils/inputMode.js'

applyInputMode(readInputMode())
watchInputModeViewport()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
