import api from "./axiosInstance";

// --- AUTHENTICATION ---import api from "./axiosInstance";

// --- 1. AUTHENTICATION ---
export const login = async (credentials) => {
  return api.post("/api/auth/login", credentials);
};

export const register = async (path, userData) => {
  // path is dynamically: "/api/auth/register/customer" or "/api/auth/register/restaurant"
  return api.post(path, userData);
};


// --- 2. DASHBOARD & USERS ---
export const getAdminDashboard = () => {
  return api.get("/api/admin/dashboard");
};

export const getAllUsers = () => {
  return api.get("/api/admin/getTop50Users");
};

export const adminDeleteUser = (userId) => {
  return api.delete(`/api/admin/deleteUser/${userId}`);
};


// --- 3. RESTAURANT APPROVALS ---
export const getPendingRestaurants = () => {
  return api.get("/api/admin/restaurants/pending");
};

export const approveRestaurant = (id) => {
  return api.post(`/api/admin/restaurants/${id}/approve`);
};

export const rejectRestaurant = (id) => {
  return api.post(`/api/admin/restaurants/${id}/reject`);
};


// --- 4. ORDER HISTORY ---
export const getAdminOrders = () => {
  return api.get("/api/admin/orders/history");
};


// --- 5. COUPONS & OFFERS ---
export const getCoupons = () => {
  return api.get("/api/admin/coupons");
};

export const createCoupon = (couponData) => {
  return api.post("/api/admin/coupons", couponData);
};

export const deleteCoupon = (id) => {
  return api.delete(`/api/admin/coupons/${id}`);
};


// --- 6. REVIEWS & FEEDBACK ---
export const getAllReviews = () => {
  return api.get("/api/admin/reviews");
};

export const deleteReview = (id) => {
  return api.delete(`/api/admin/reviews/${id}`);
};


// --- 7. SYSTEM SETTINGS ---
export const getSystemSettings = () => {
  return api.get("/api/admin/settings");
};

export const updateSystemSettings = (settingsData) => {
  return api.put("/api/admin/settings", settingsData);
};
/*

Auth
POST /api/auth/register/customer
POST /api/auth/register/restaurant
POST /api/auth/login
Public browsing
GET /api/restaurants
GET /api/restaurants/{restaurantId}/menu
Customer cart
GET /api/cart
POST /api/cart/items
DELETE /api/cart/items/{cartItemId}
DELETE /api/cart/clear
Orders
POST /api/orders/checkout
GET /api/orders/my
GET /api/orders/restaurant/{restaurantId}
Restaurant management
PUT /api/restaurants/me
POST /api/restaurants/{restaurantId}/menu-items
PUT /api/restaurants/{restaurantId}/menu-items/{menuItemId}
DELETE /api/restaurants/{restaurantId}/menu-items/{menuItemId}
POST /api/restaurants/{restaurantId}/delivery-men
Admin
GET /api/admin/users
GET /api/admin/restaurants
POST /api/admin/restaurants/{restaurantId}/approve
POST /api/admin/restaurants/{restaurantId}/reject
PUT /api/admin/users/{userId}/role
PUT /api/admin/users/{userId}/enabled

*/