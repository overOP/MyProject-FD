import { createBrowserRouter } from "react-router";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";

export const routes = createBrowserRouter([
    {
        path: '/',
        element:<MainLayout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path: '/profile',
                element: <Profile/>
            },
            {
                path: '/analytics',
                element: <Analytics/>
            },
            {
                path: '/settings',
                element: <Settings/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/cart',
                element: <Cart/>
            },
            {   path: '/product/:id',
                element: <ProductDetail />
            }
        ]
    }
])