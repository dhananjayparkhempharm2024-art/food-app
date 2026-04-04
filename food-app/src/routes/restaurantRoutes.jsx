import React from 'react';
import RestaurantLayout from '../layouts/RestaurantLayout';
import LiveOrders from '../pages/restaurant/LiveOrders';
import MenuManager from '../pages/restaurant/MenuManager';
import OrderHistory from '../pages/restaurant/OrderHistory';
import RestaurantProfile from '../pages/restaurant/RestaurantProfile';
import Insights from '../pages/restaurant/Insights';

export const restaurantRoutes = [
  {
    path: '/',
    element: <RestaurantLayout />,
    children: [
      { 
        path: '/', 
        element: <LiveOrders /> // Default view: shows new orders to accept
      },
      { 
        path: 'menu-management', 
        element: <MenuManager /> // Add/Edit dishes and toggle "Out of Stock"
      },
      { 
        path: 'past-orders', 
        element: <OrderHistory /> // List of completed/cancelled orders
      },
      { 
        path: 'business-insights', 
        element: <Insights /> // Daily sales and popular items
      },
      { 
        path: 'restaurant-settings', 
        element: <RestaurantProfile /> // Change opening hours or shop image
      }
    ]
  }
];