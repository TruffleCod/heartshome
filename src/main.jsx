import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { applyInputMode, readInputMode, watchInputModeViewport } from './utils/inputMode.js'
import { isTapTapH5 } from './utils/publicPath.js'

applyInputMode(readInputMode())
watchInputModeViewport()

if (isTapTapH5) {
  document.addEventListener('click', (event) => {
    const anchor = event.target.closest?.('a[href]')
    if (!anchor) return

    const destination = new URL(anchor.href, window.location.href)
    if (destination.hash.startsWith('#/')) {
      event.preventDefault()
      window.location.hash = destination.hash.slice(1)
    }
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
