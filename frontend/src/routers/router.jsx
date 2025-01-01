import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
const router =createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path :'/',
                element:<Home/>
            },
            {
                path :"/about",
                element: <div>about</div>
            },
            {
                path:"/order",
                element:<div>order</div>
            }
        ]
    },
]);
export default router;