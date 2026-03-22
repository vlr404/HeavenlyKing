import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <BrowserRouter basename="/HeavenlyKing">
      <App />
    </BrowserRouter>
  </HelmetProvider>
)