import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AllRoutes from './routes/AllRoutes.jsx';
import AuthProvider from './providers/AuthProvider.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={AllRoutes}>
            <App />
          </RouterProvider>
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);
