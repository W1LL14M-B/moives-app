import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './style.css'
import { BrowserRouter } from 'react-router-dom'
import { MoviesProvider } from './hook/MoviesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MoviesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MoviesProvider>
  </StrictMode>,
)
