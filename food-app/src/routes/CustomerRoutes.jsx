

export const customerRoutes = [
  {
    path: '/',
    element: <CustomerLayout />,
    children: [
      { path: '/', element: <Home /> }, // The logged-in marketplace
      { path: 'restaurant/:id', element: <RestaurantDetails /> },
      { path: 'cart', element: <Cart /> },
      { path: 'orders', element: <MyOrders /> },
      { path: 'profile', element: <UserProfile /> }
    ]
  }
];