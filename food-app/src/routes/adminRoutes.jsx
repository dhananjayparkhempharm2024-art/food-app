import AdminDashboard from "../AdminPages/AdminDashboard";
import AdminLayout from "../AdminPages/AdminLayout";
import AdminSettings from "../AdminPages/AdminSettings";
import CouponsAndOrders from "../AdminPages/CouponsAndOrders";
import OrderHistory from "../AdminPages/OrderHistory";
import RestaurantRequests from "../AdminPages/RestaurantRequest";
import ReviewsAndFeedBack from "../AdminPages/ReviewsAndFeedBack";

import UserManagement from "../AdminPages/UserManagement";
export const adminRoutes = [
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      { path: '/', element: <AdminDashboard /> },
      { path: 'users', element: <UserManagement /> },
      { path: 'approvals', element: <RestaurantRequests /> },
      {path:"orders", element: <OrderHistory />},
      { path: 'coupons', element: <CouponsAndOrders /> },
      { path: 'reviews', element: <ReviewsAndFeedBack /> },
      { path: 'settings', element: <AdminSettings /> }
    ]
  }
];

