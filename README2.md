# API JSON Objects and Structures

This file contains ready-to-use JSON examples and payload structures for testing all APIs.

Base URL example: `http://localhost:8080`

## Authentication

For secured endpoints, send header:

```http
Authorization: Bearer <token>
Content-Type: application/json
```

---

## 1) Auth APIs (`/api/auth`)

### `POST /api/auth/register/customer`

**Request JSON**

```json
{
  "fullName": "Rahul Sharma",
  "email": "rahul.customer@example.com",
  "password": "Pass@123",
  "phone": "9876543210"
}
```

**Field structure**
- `fullName` (string, required)
- `email` (string, required, valid email)
- `password` (string, required)
- `phone` (string, optional)

### `POST /api/auth/register/restaurant`

**Request JSON**

```json
{
  "fullName": "Anita Verma",
  "email": "anita.owner@example.com",
  "password": "Pass@123",
  "phone": "9988776655",
  "restaurantName": "Spice Hub",
  "description": "North Indian and Chinese cuisine",
  "address": "MG Road, Pune",
  "cuisineType": "Indian, Chinese",
  "restaurantPhone": "9123456780"
}
```

**Field structure**
- `fullName` (string, required)
- `email` (string, required, valid email)
- `password` (string, required)
- `phone` (string, optional)
- `restaurantName` (string, required)
- `description` (string, optional)
- `address` (string, optional)
- `cuisineType` (string, optional)
- `restaurantPhone` (string, optional)

### `POST /api/auth/login`

**Request JSON**

```json
{
  "email": "rahul.customer@example.com",
  "password": "Pass@123"
}
```

**Field structure**
- `email` (string, required, valid email)
- `password` (string, required)

### Auth success response structure (`register`/`login`)

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "tokenType": "Bearer",
  "userId": 1,
  "fullName": "Rahul Sharma",
  "email": "rahul.customer@example.com",
  "role": "CUSTOMER"
}
```

---

## 2) Admin APIs (`/api/admin`)  
Role: `ADMIN` or `SYSTEM_ADMIN`

### `GET /api/admin/getTop50Users`

**Response JSON**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Shubham Mokode",
      "email": "shubham@example.com",
      "contact": "9876543210",
      "verified": true,
      "accountStatus": "ACTIVE"
    }
  ]
}
```

**Notes**
- The React frontend can access the list with `response.data.data`.
- `verified` maps to the user’s enabled state.
- `accountStatus` is returned as `ACTIVE` or `DISABLED`.

### `DELETE /api/admin/deleteUser/{userId}`

No request body.

**Success response JSON**

```json
{
  "data": "User deleted successfully"
}
```

**Rules**
- An admin cannot delete themselves.
- If the user does not exist, the API returns a `404` with `User not found`.

### `GET /api/admin/dashboard`

**Response JSON**

```json
{
  "data": {
    "totalUsers": 42,
    "totalRestaurants": 8,
    "totalOrders": 128,
    "totalRevenue": 45890.75,
    "recentOrders": [
      {
        "id": 101,
        "status": "DELIVERED",
        "totalAmount": 499.0,
        "createdAt": "2026-04-04T04:30:00Z"
      }
    ]
  }
}
```

**Notes**
- The React frontend can access the payload with `response.data.data`.
- `createdAt` is serialized as an ISO-8601 string, so `new Date(createdAt)` works directly in JavaScript.
- `recentOrders` contains the latest 5 orders only.

### `GET /api/admin/users`
No request body.

### `GET /api/admin/restaurants`
No request body.

### `POST /api/admin/restaurants/{restaurantId}/approve`
No request body.

### `POST /api/admin/restaurants/{restaurantId}/reject`
No request body.

### `PUT /api/admin/users/{userId}/role`

**Request JSON**

```json
{
  "role": "DELIVERY_MAN"
}
```

**Allowed `role` values**
- `SYSTEM_ADMIN`
- `ADMIN`
- `RESTAURANT`
- `CUSTOMER`
- `DELIVERY_MAN`

### `PUT /api/admin/users/{userId}/enabled`

**Request JSON**

```json
{
  "enabled": false
}
```

**Field structure**
- `enabled` (boolean, required)

---

## 3) Restaurant APIs (`/api/restaurants`)

### `GET /api/restaurants`
Public endpoint, no request body.

### `GET /api/restaurants/{restaurantId}/menu`
Public endpoint, no request body.

### `PUT /api/restaurants/me`  
Role: `RESTAURANT`, `ADMIN`, `SYSTEM_ADMIN`

**Request JSON**

```json
{
  "name": "Spice Hub Updated",
  "description": "Pure veg and non-veg options",
  "address": "FC Road, Pune",
  "phone": "9090909090",
  "cuisineType": "Indian"
}
```

**Field structure**
- `name` (string, required)
- `description` (string, optional)
- `address` (string, optional)
- `phone` (string, optional)
- `cuisineType` (string, optional)

### `POST /api/restaurants/{restaurantId}/menu-items`  
Role: `RESTAURANT`, `ADMIN`, `SYSTEM_ADMIN`

**Request JSON**

```json
{
  "name": "Paneer Tikka",
  "description": "Grilled cottage cheese",
  "price": 249.50,
  "category": "Starter",
  "available": true
}
```

**Field structure**
- `name` (string, required)
- `description` (string, optional)
- `price` (number, required, must be `> 0`)
- `category` (string, optional)
- `available` (boolean, optional)

### `PUT /api/restaurants/{restaurantId}/menu-items/{menuItemId}`  
Role: `RESTAURANT`, `ADMIN`, `SYSTEM_ADMIN`

**Request JSON**

```json
{
  "name": "Paneer Tikka Masala",
  "description": "Creamy tomato gravy",
  "price": 289.00,
  "category": "Main Course",
  "available": true
}
```

### `DELETE /api/restaurants/{restaurantId}/menu-items/{menuItemId}`
No request body.

### `POST /api/restaurants/{restaurantId}/delivery-men`  
Role: `RESTAURANT`, `ADMIN`, `SYSTEM_ADMIN`

**Request JSON**

```json
{
  "fullName": "Ravi Delivery",
  "email": "ravi.delivery@example.com",
  "password": "Pass@123",
  "phone": "9000011111"
}
```

**Field structure**
- `fullName` (string, required)
- `email` (string, required, valid email)
- `password` (string, required)
- `phone` (string, optional)

---

## 4) Cart APIs (`/api/cart`)  
Role: `CUSTOMER`

### `GET /api/cart`
No request body.

### `POST /api/cart/items`

**Request JSON**

```json
{
  "menuItemId": 5,
  "quantity": 2  
}
```

**Field structure**
- `menuItemId` (number, required)
- `quantity` (integer, required, minimum `1`)

### `DELETE /api/cart/items/{cartItemId}`
No request body.

### `DELETE /api/cart/clear`
No request body.

---

## 5) Order APIs (`/api/orders`)

### `POST /api/orders/checkout`  
Role: `CUSTOMER`

**Request JSON**

```json
{
  "deliveryAddress": "Flat 201, Green Park, Pune"
}
```

**Field structure**
- `deliveryAddress` (string, required)

### `GET /api/orders/my`  
Role: `CUSTOMER`

No request body.

### `GET /api/orders/restaurant/{restaurantId}`  
Role: `ADMIN`, `SYSTEM_ADMIN`

No request body.

---

## Common response object structures

### `User`

```json
{
  "createdAt": "2026-04-03T12:00:00Z",
  "updatedAt": "2026-04-03T12:00:00Z",
  "id": 10,
  "fullName": "Ravi Delivery",
  "email": "ravi.delivery@example.com",
  "phone": "9000011111",
  "role": "DELIVERY_MAN",
  "enabled": true
}
```

### `Restaurant`

```json
{
  "createdAt": "2026-04-03T12:00:00Z",
  "updatedAt": "2026-04-03T12:00:00Z",
  "id": 2,
  "name": "Spice Hub",
  "description": "North Indian and Chinese cuisine",
  "address": "MG Road, Pune",
  "phone": "9123456780",
  "cuisineType": "Indian",
  "status": "APPROVED"
}
```

### `MenuItem`

```json
{
  "createdAt": "2026-04-03T12:00:00Z",
  "updatedAt": "2026-04-03T12:00:00Z",
  "id": 5,
  "name": "Paneer Tikka",
  "description": "Grilled cottage cheese",
  "price": 249.50,
  "category": "Starter",
  "available": true
}
```

### `Cart`

```json
{
  "createdAt": "2026-04-03T12:00:00Z",
  "updatedAt": "2026-04-03T12:00:00Z",
  "id": 3,
  "checkedOut": false,
  "items": [
    {
      "createdAt": "2026-04-03T12:00:00Z",
      "updatedAt": "2026-04-03T12:00:00Z",
      "id": 8,
      "menuItem": {
        "createdAt": "2026-04-03T12:00:00Z",
        "updatedAt": "2026-04-03T12:00:00Z",
        "id": 5,
        "name": "Paneer Tikka",
        "description": "Grilled cottage cheese",
        "price": 249.50,
        "category": "Starter",
        "available": true
      },
      "quantity": 2,
      "unitPrice": 249.50,
      "lineTotal": 499.00
    }
  ]
}
```

### `CustomerOrder`

```json
{
  "createdAt": "2026-04-03T12:00:00Z",
  "updatedAt": "2026-04-03T12:00:00Z",
  "id": 11,
  "status": "CREATED",
  "totalAmount": 499.00,
  "deliveryAddress": "Flat 201, Green Park, Pune",
  "items": [
    {
      "createdAt": "2026-04-03T12:00:00Z",
      "updatedAt": "2026-04-03T12:00:00Z",
      "id": 21,
      "menuItemName": "Paneer Tikka",
      "quantity": 2,
      "unitPrice": 249.50,
      "lineTotal": 499.00
    }
  ]
}
```

---

## Common error response

```json
{
  "timestamp": "2026-04-03T10:15:30Z",
  "status": 400,
  "error": "Bad Request",
  "message": "email: must be a well-formed email address",
  "path": "/api/auth/register/customer"
}
```

---

## Quick testing order

1. Register/login to get token.
2. Use token in `Authorization` header.
3. Create restaurant + approve (if testing as admin flow).
4. Add menu items.
5. Add cart items.
6. Checkout and verify order APIs.

