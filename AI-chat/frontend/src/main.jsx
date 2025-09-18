import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store'

// Force dark theme to match the requested design (s2.png).
// This adds the `.theme-dark` token overrides from the variables file.
try {
  document.documentElement.classList.add('theme-dark')
} catch (e) {
  // ignore in SSR or other environments
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
