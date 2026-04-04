import Cart from "../pages/Cart";
import DashBoard from "../pages/DashBoard";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Payment from "../pages/Payment";
import Signup from "../pages/Signup";


export const publicRoutes = [
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: <DashBoard />
                },
                {
                    path: 'payment',
                    element: <Payment />
                },
                {
                    path: 'cart',
                    element: <Cart />
                },
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'signup',
                    element: <Signup />
                }

            ]
        }
    ];