import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import AllRoutes from './routes/AllRoutes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={AllRoutes} >
        <App />
      </RouterProvider>
    </HelmetProvider>
  </StrictMode>,
)
