import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n';
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AllRoutes from './routes/AllRoutes.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import UtilityProvider from './providers/UtilityProvider.jsx';
import ProductProvider from './providers/ProductProvider.jsx';
import ShopProvider from './providers/ShopProvider.jsx';
import CategoryProvider from './providers/CategoryProvider.jsx';
import OrderProvider from './providers/OrderProvider.jsx';
import UserProvider from './providers/UserProvider.jsx';
import SubCategoryProvider from './providers/SubCategoryProvider.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <UtilityProvider>
          <ShopProvider>
            <CategoryProvider>
              <SubCategoryProvider>
                <ProductProvider>
                  <UserProvider>
                    <OrderProvider>
                      <QueryClientProvider client={queryClient}>
                        <RouterProvider router={AllRoutes}>
                          <App />
                        </RouterProvider>
                      </QueryClientProvider>
                    </OrderProvider>
                  </UserProvider>
                </ProductProvider>
              </SubCategoryProvider>
            </CategoryProvider>
          </ShopProvider>
        </UtilityProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);
