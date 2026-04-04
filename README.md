# Food Service Backend

Spring Boot backend for a food ordering platform with JWT authentication and role-based authorization.

## Implemented roles
- `SYSTEM_ADMIN` — highest privilege, bootstrap account
- `ADMIN`
- `RESTAURANT`
- `CUSTOMER`
- `DELIVERY_MAN`

## Implemented features
- Public customer registration
- Public restaurant registration with pending approval
- Public login with JWT bearer token
- Public restaurant browsing
- Public restaurant menu browsing
- Customer cart management
- Customer checkout to create orders
- Restaurant menu management
- Restaurant delivery-man registration
- Admin restaurant approval/rejection
- Admin user role/status management

## Main endpoints
### Auth
- `POST /api/auth/register/customer`
- `POST /api/auth/register/restaurant`
- `POST /api/auth/login`

### Public browsing
- `GET /api/restaurants`
- `GET /api/restaurants/{restaurantId}/menu`

### Customer cart
- `GET /api/cart`
- `POST /api/cart/items`
- `DELETE /api/cart/items/{cartItemId}`
- `DELETE /api/cart/clear`

### Orders
- `POST /api/orders/checkout`
- `GET /api/orders/my`
- `GET /api/orders/restaurant/{restaurantId}`

### Restaurant management
- `PUT /api/restaurants/me`
- `POST /api/restaurants/{restaurantId}/menu-items`
- `PUT /api/restaurants/{restaurantId}/menu-items/{menuItemId}`
- `DELETE /api/restaurants/{restaurantId}/menu-items/{menuItemId}`
- `POST /api/restaurants/{restaurantId}/delivery-men`

### Admin
- `GET /api/admin/users`
- `GET /api/admin/restaurants`
- `POST /api/admin/restaurants/{restaurantId}/approve`
- `POST /api/admin/restaurants/{restaurantId}/reject`
- `PUT /api/admin/users/{userId}/role`
- `PUT /api/admin/users/{userId}/enabled`

## Local run
```powershell
./mvnw.cmd spring-boot:run
```

## Test
```powershell
./mvnw.cmd test
```

## Default bootstrap system admin
Configured in `src/main/resources/application.properties`.

- Email: `system.admin@food.local`
- Password: `ChangeMe123!`

## Notes
- JWT secret and bootstrap credentials should be changed before production use.
- H2 is configured for local development and testing.

