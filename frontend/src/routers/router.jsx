import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/Books/CartPage";
import Checkout from "../pages/Books/CheckoutPage";
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
            },
            {
                path:"/login",
                element:<Login/>

            }, 
            {
                path:"/register",
                element:<Register/>
            },
            {
                path:"/cart",
                element:<CartPage/>
            },
            {
                path :"/checkout",
                element:<Checkout/>

            },
            
        ]
    },
]);
export default router;