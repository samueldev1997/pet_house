import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Cart } from "./pages/cart";

import { Layout } from "./components/layout";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Checkout } from "./pages/checkout";

import { Private } from "./routes/private";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                element: <Home/>,
                path: '/'
            },
            {
                element: <Cart/>,
                path: '/cart'
            },
            {
                element: <Login/>,
                path: '/login'
            },
            {
                element: <Register/>,
                path: '/register'
            },
            {
                element: <Private> <Checkout/> </Private>,
                path: '/checkout'
            }
        ]
    }
])

export { router }