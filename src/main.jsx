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
import ShopProvider from './providers/ShopProvider.jsx';
import CategoryProvider from './providers/CategoryProvider.jsx';
import SubCategoryProvider from './providers/SubCategoryProvider.jsx';
import ProductProvider from './providers/ProductProvider.jsx';
import UserProvider from './providers/UserProvider.jsx';
import OrderProvider from './providers/OrderProvider.jsx';
import ReviewProvider from './providers/ReviewProvider.jsx';
import PaymentProvider from './providers/PaymentProvider.jsx';
import CarouselProvider from './providers/CarouselProvider.jsx';
import CampaignProvider from './providers/CampaignProvider.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <UtilityProvider>
          <CarouselProvider>
            <ShopProvider>
              <CampaignProvider>
                <CategoryProvider>
                  <SubCategoryProvider>
                    <ProductProvider>
                      <UserProvider>
                        <OrderProvider>
                          <PaymentProvider>
                            <ReviewProvider>
                              <QueryClientProvider client={queryClient}>
                                <RouterProvider router={AllRoutes}>
                                  <App />
                                </RouterProvider>
                              </QueryClientProvider>
                            </ReviewProvider>
                          </PaymentProvider>
                        </OrderProvider>
                      </UserProvider>
                    </ProductProvider>
                  </SubCategoryProvider>
                </CategoryProvider>
              </CampaignProvider>
            </ShopProvider>
          </CarouselProvider>
        </UtilityProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);
