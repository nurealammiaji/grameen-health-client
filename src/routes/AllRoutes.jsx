import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorBoundary from "../pages/Error/ErrorBoundary";
import Home from "../pages/Home/Home";
import Login from './../pages/Login/Login';
import PrivateRoute from "./PrivateRoute";
import CustomerRoute from "./CustomerRoute";
import MerchantRoute from "./MerchantRoute";
import AdminRoute from "./AdminRoute";
import TermsConditions from "../pages/TermsConditions/TermsConditions";
import Campaign from "../pages/Campaign/Campaign";
import Search from "../pages/Search/Search";
import Tracking from "../pages/Tracking/Tacking"
import Contact from "../pages/Contact/Contact";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Customer from "../pages/Dashboard/Customer/Customer";
import CustomerProfile from "../pages/Dashboard/Customer/CustomerProfile/CustomerProfile";
import CustomerCart from "../pages/Dashboard/Customer/CustomerCart/CustomerCart";
import CustomerOrders from "../pages/Dashboard/Customer/CustomerOrders/CustomerOrders";
import CustomerPayments from "../pages/Dashboard/Customer/CustomerPayments/CustomerPayments";
import Merchant from "../pages/Dashboard/Merchant/Merchant";
import MerchantProfile from "../pages/Dashboard/Merchant/MerchantProfile/MerchantProfile";
import MerchantStore from "../pages/Dashboard/Merchant/MerchantStore/MerchantStore";
import MerchantPayments from "../pages/Dashboard/Merchant/MerchantPayments/MerchantPayments";
import MerchantOrders from "../pages/Dashboard/Merchant/MerchantOrders/MerchantOrders";
import MerchantProducts from "../pages/Dashboard/Merchant/MerchantProducts/MerchantProducts";
import Admin from "../pages/Dashboard/Admin/Admin";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile/AdminProfile";
import ManageOrders from "../pages/Dashboard/Admin/ManageOrders/ManageOrders";
import ManageStores from '../pages/Dashboard/Admin/ManageStores/ManageStores';
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageSliders from "../pages/Dashboard/Admin/ManageSliders/ManageSliders";
import ManageProducts from "../pages/Dashboard/Admin/ManageProducts/ManageProducts";
import ManagePayments from "../pages/Dashboard/Admin/ManagePayments/ManagePayments";
import ManageCategories from "../pages/Dashboard/Admin/ManageCategories/ManageCategories";

const AllRoutes = createBrowserRouter([
    // Public Routes
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
    // Private Routes
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: "/dashboard",
                element: <PrivateRoute>
                    <div className="text-center">
                        <br /><br /><br /><br /><br />
                        <h2 className="lg:text-3xl">Welcome to <span className="text-success">Dashboard</span> !!</h2>
                    </div></PrivateRoute>
            },
            // Admin Routes
            {
                path: "/dashboard/admin",
                element: <PrivateRoute><AdminRoute><Admin /></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/admin/profile",
                element: <PrivateRoute><AdminRoute><AdminProfile /></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/admin/users",
                element: <PrivateRoute><AdminRoute><ManageUsers /></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/admin/stores",
                element: <PrivateRoute><AdminRoute><ManageStores /></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/admin/orders",
                element: <PrivateRoute><AdminRoute><ManageOrders /></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/admin/sliders",
                element: <PrivateRoute><AdminRoute><ManageSliders /></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/admin/products",
                element: <PrivateRoute><AdminRoute><ManageProducts /></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/admin/payments",
                element: <PrivateRoute><AdminRoute><ManagePayments /></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/admin/categories",
                element: <PrivateRoute><AdminRoute><ManageCategories /></AdminRoute></PrivateRoute>
            },
            // Merchant Routes
            {
                path: "/dashboard/merchant",
                element: <PrivateRoute><MerchantRoute><Merchant /></MerchantRoute></PrivateRoute>
            },
            {
                path: "/dashboard/merchant/profile",
                element: <PrivateRoute><MerchantRoute><MerchantProfile /></MerchantRoute></PrivateRoute>
            },
            {
                path: "/dashboard/merchant/payments",
                element: <PrivateRoute><MerchantRoute><MerchantPayments /></MerchantRoute></PrivateRoute>
            },
            {
                path: "/dashboard/merchant/store",
                element: <PrivateRoute><MerchantRoute><MerchantStore /></MerchantRoute></PrivateRoute>
            },
            {
                path: "/dashboard/merchant/orders",
                element: <PrivateRoute><MerchantRoute><MerchantOrders /></MerchantRoute></PrivateRoute>
            },
            {
                path: "/dashboard/merchant/products",
                element: <PrivateRoute><MerchantRoute><MerchantProducts /></MerchantRoute></PrivateRoute>
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
