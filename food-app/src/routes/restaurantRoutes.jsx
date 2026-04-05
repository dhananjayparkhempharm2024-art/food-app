import RestaurantLayout from '../layouts/RestaurantLayout';
import RestaurantDeliveryMenPage from '../pages/restaurant/RestaurantDeliveryMenPage';
import RestaurantHomePage from '../pages/restaurant/RestaurantHomePage';
import RestaurantMenuManagerPage from '../pages/restaurant/RestaurantMenuManagerPage';
import RestaurantOrdersPage from '../pages/restaurant/RestaurantOrdersPage';

export const restaurantRoutes = [
  {
    path: '/',
    element: <RestaurantLayout />,
    children: [
      { path: '/', element: <RestaurantHomePage /> },
      { path: 'menu', element: <RestaurantMenuManagerPage /> },
      { path: 'orders', element: <RestaurantOrdersPage /> },
      { path: 'delivery-men', element: <RestaurantDeliveryMenPage /> }
    ]
  }
];