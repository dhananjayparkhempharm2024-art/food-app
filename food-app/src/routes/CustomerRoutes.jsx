import CustomerLayout from "../layouts/CustomerLayout";
import CheckoutPage from "../pages/customer/CheckoutPage";
import CustomerCartPage from "../pages/customer/CustomerCartPage";
import CustomerOrdersPage from "../pages/customer/CustomerOrdersPage";
import RestaurantMenuPage from "../pages/customer/RestaurantMenuPage";
import RestaurantsPage from "../pages/customer/RestaurantsPage";

export const customerRoutes = [
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      { path: "/", element: <RestaurantsPage /> },
      { path: "restaurants/:id", element: <RestaurantMenuPage /> },
      { path: "cart", element: <CustomerCartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "orders", element: <CustomerOrdersPage /> }
    ]
  }
];