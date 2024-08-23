import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorBoundary from "../pages/Error/ErrorBoundary";
import Home from "../pages/Home/Home";

const AllRoutes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }
]);

export default AllRoutes;
