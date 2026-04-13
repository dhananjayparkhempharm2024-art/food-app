import React from "react";

const DeliveryPlaceholder = () => (
  <div style={{ padding: 24 }}>
    <h2>Delivery Panel</h2>
    <p>Delivery pages are not implemented yet.</p>
  </div>
);

export const deliveryRoutes = [
  {
    path: '/',
    element: <DeliveryPlaceholder />
  }
];