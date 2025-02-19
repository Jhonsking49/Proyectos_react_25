import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { FavoritesProvider } from './contexts/FavoritesContext.jsx'
import { ReviewsProvider } from './contexts/Reviewscontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <FavoritesProvider>
        <ReviewsProvider>
          <App />
        </ReviewsProvider>
      </FavoritesProvider>
    </AuthProvider>
  </StrictMode>,
)
