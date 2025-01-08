import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './style.css'
import { BrowserRouter } from 'react-router-dom'
import { MoviesProvider } from './hook/MoviesContext.tsx'
import { HelmetProvider } from 'react-helmet-async';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
    <MoviesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MoviesProvider>
    </HelmetProvider>
  </StrictMode>,
)
