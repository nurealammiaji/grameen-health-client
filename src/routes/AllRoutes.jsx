import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorBoundary from "../pages/Error/ErrorBoundary";
import Home from "../pages/Home/Home";
import Login from './../pages/Login/Login';
import PrivateRoute from "./PrivateRoute";
import TermsConditions from "../pages/TermsConditions/TermsConditions";
import Register from "../pages/Register/Register";

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
]);

export default AllRoutes;
