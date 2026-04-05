import api from "./axiosInstance";

// --- AUTHENTICATION ---
export const login = async (credentials) => {
  return api.post("/api/auth/login", credentials);
};

export const register = async (path, userData) => {
  return api.post(path, userData);
};

// --- CUSTOMER ---
export const getRestaurants = () => api.get("/api/restaurants");
export const getRestaurantMenu = (restaurantId) => api.get(`/api/restaurants/${restaurantId}/menu`);
export const getCart = () => api.get("/api/cart");
export const addToCart = (payload) => api.post("/api/cart/items", payload);
export const removeCartItem = (cartItemId) => api.delete(`/api/cart/items/${cartItemId}`);
export const clearCart = () => api.delete("/api/cart/clear");
export const checkout = (payload) => api.post("/api/orders/checkout", payload);
export const getMyOrders = () => api.get("/api/orders/my");

// --- RESTAURANT ---
export const getMyRestaurant = () => api.get("/api/restaurants/me");
export const updateMyRestaurant = (payload) => api.put("/api/restaurants/me", payload);
export const addMenuItem = (restaurantId, payload) => api.post(`/api/restaurants/${restaurantId}/menu-items`, payload);
export const updateMenuItem = (restaurantId, menuItemId, payload) =>
  api.put(`/api/restaurants/${restaurantId}/menu-items/${menuItemId}`, payload);
export const deleteMenuItem = (restaurantId, menuItemId) =>
  api.delete(`/api/restaurants/${restaurantId}/menu-items/${menuItemId}`);
export const getRestaurantOrders = () => api.get("/api/restaurants/me/orders");
export const getRestaurantTransactions = () => api.get("/api/restaurants/me/transactions");
export const getDeliveryMen = (restaurantId) => api.get(`/api/restaurants/${restaurantId}/delivery-men`);
export const addDeliveryMan = (restaurantId, payload) => api.post(`/api/restaurants/${restaurantId}/delivery-men`, payload);

// --- ADMIN ---
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

