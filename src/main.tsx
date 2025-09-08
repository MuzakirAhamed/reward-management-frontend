import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "sonner"
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryPage from './pages/ErrorBoundaryPage.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorBoundaryPage}>
        <AuthContextProvider >
          <App />
        </AuthContextProvider>
      </ErrorBoundary>
      <Toaster position="top-right" />
    </QueryClientProvider>
  </StrictMode>,
)
