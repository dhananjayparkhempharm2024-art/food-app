

export const deliveryRoutes = [
  {
    path: '/',
    element: <DeliveryLayout />,
    children: [
      { path: '/', element: <AvailableJobs /> },
      { path: 'active-order', element: <ActiveDelivery /> },
      { path: 'earnings', element: <Earnings /> },
      { path: 'profile', element: <DeliveryProfile /> }
    ]
  }
];