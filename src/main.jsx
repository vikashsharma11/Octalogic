import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './contexts/UserContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/* Wrap the app with UserProvider */}
      <App />
    </UserProvider>
  </StrictMode>,
)
