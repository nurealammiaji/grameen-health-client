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
            {
                path: "/dashboard/admin",
                element: <PrivateRoute><AdminRoute><Admin /></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/merchant",
                element: <PrivateRoute><MerchantRoute><Merchant /></MerchantRoute></PrivateRoute>
            },
            {
                path: "/dashboard/customer",
                element: <PrivateRoute><CustomerRoute><Customer /></CustomerRoute></PrivateRoute>
            }
        ]
    }
]);

export default AllRoutes;
