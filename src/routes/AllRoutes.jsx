import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorBoundary from "../pages/Error/ErrorBoundary";
import Home from "../pages/Home/Home";
import Login from './../pages/Login/Login';
import PrivateRoute from "./PrivateRoute";
import TermsConditions from "../pages/TermsConditions/TermsConditions";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Admin from "../pages/Dashboard/Admin/Admin";
import Merchant from "../pages/Dashboard/Merchant/Merchant";
import Customer from "../pages/Dashboard/Customer/Customer";
import CustomerRoute from "./CustomerRoute";
import MerchantRoute from "./MerchantRoute";
import AdminRoute from "./AdminRoute";
import CustomerProfile from "../pages/Dashboard/Customer/CustomerProfile/CustomerProfile";
import CustomerCart from "../pages/Dashboard/Customer/CustomerCart/CustomerCart";
import CustomerOrders from "../pages/Dashboard/Customer/CustomerOrders/CustomerOrders";
import CustomerPayments from "../pages/Dashboard/Customer/CustomerPayments/CustomerPayments";
import Campaign from "../pages/Campaign/Campaign";
import Search from "../pages/Search/Search";
import Tracking from "../pages/Tracking/Tacking"
import Contact from "../pages/Contact/Contact";

const AllRoutes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "/campaign",
                element: <Campaign />
            },
            {
                path: "/search",
                element: <Search />
            },
            {
                path: "/tracking",
                element: <Tracking />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/terms",
                element: <PrivateRoute><TermsConditions /></PrivateRoute>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        errorElement: <ErrorBoundary />,
        children: [
            // Admin Routes
            {
                path: "/dashboard/admin",
                element: <PrivateRoute><AdminRoute><Admin /></AdminRoute></PrivateRoute>
            },
            // Merchant Routes
            {
                path: "/dashboard/merchant",
                element: <PrivateRoute><MerchantRoute><Merchant /></MerchantRoute></PrivateRoute>
            },
            // Customer Routes
            {
                path: "/dashboard/customer",
                element: <PrivateRoute><CustomerRoute><Customer /></CustomerRoute></PrivateRoute>
            },
            {
                path: "/dashboard/customer/cart",
                element: <PrivateRoute><CustomerRoute><CustomerCart /></CustomerRoute></PrivateRoute>
            },
            {
                path: "/dashboard/customer/profile",
                element: <PrivateRoute><CustomerRoute><CustomerProfile /></CustomerRoute></PrivateRoute>
            },
            {
                path: "/dashboard/customer/orders",
                element: <PrivateRoute><CustomerRoute><CustomerOrders /></CustomerRoute></PrivateRoute>
            },
            {
                path: "/dashboard/customer/payments",
                element: <PrivateRoute><CustomerRoute><CustomerPayments /></CustomerRoute></PrivateRoute>
            },
        ]
    }
]);

export default AllRoutes;
