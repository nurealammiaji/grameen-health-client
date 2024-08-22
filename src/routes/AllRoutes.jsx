import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const AllRoutes = createBrowserRouter([
    {
        path: "/",
        element: <App />
    }
]);

export default AllRoutes;
