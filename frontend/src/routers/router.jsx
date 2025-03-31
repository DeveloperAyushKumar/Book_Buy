import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/Books/CartPage";
import Checkout from "../pages/Books/CheckoutPage";
import SingleBook from "../pages/Books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import Orders from "../pages/Books/Orders";
import CheckoutPage from "../pages/Books/CheckoutPage";
import AdminLogin from "../components/AdminLogin";
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import ManageBooks from "../pages/Dashboard/ManageBooks/ManageBook";
import AddBook from "../pages/Dashboard/AddBook/AddBook";
import UpdateBook from "../pages/Dashboard/EditBook/UpdateBook";
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
                path:"/orders",
                element:<PrivateRoute><Orders/></PrivateRoute>
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
                element:  <CheckoutPage/>
                

            },
            {
                path:"/books/:id",
                element:<SingleBook/>

            }
            
        ]
    },
    {
        path:"/admin",
        element:<AdminLogin/>,
    },
    {
        path:"/dashboard",
        element:<AdminRoute><DashboardLayout/></AdminRoute>,
        children:[
            {
                path:"",
                element:<AdminRoute><Dashboard/></AdminRoute>
            },
            {
                path:"add-new-book",
                element:<AddBook/>
            },
            {
                path:"edit-book/:id",
                element:<UpdateBook/>
            },
            {
                path:"manage-books",
                element:<AdminRoute><ManageBooks/></AdminRoute>
            }

        ]
    }
]);
export default router;