# Food Delivery Monorepo

Production-style monorepo for a food delivery platform with:

- Spring Boot backend (JWT + role-based access)
- React + Vite frontend admin/customer/restaurant apps

## Repository Structure

```text
food/
  src/                 # Spring Boot backend source
  food-app/            # React frontend app
  docs/                # Project documentation and standards
  README2.md           # Legacy API JSON examples (kept for compatibility)
```

Detailed structure and conventions: `docs/PROJECT_STRUCTURE.md`

## Quick Start

### 1) Backend

```powershell
cd C:\Users\Shubham Mokode\Desktop\Customers\customProject2\food
.\mvnw.cmd spring-boot:run
```

Backend default URL: `http://localhost:8082`

### 2) Frontend

```powershell
cd C:\Users\Shubham Mokode\Desktop\Customers\customProject2\food\food-app
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Validation Commands

```powershell
cd C:\Users\Shubham Mokode\Desktop\Customers\customProject2\food
.\mvnw.cmd test
```

```powershell
cd C:\Users\Shubham Mokode\Desktop\Customers\customProject2\food\food-app
npm run build
```

## Roles

- `SYSTEM_ADMIN`
- `ADMIN`
- `RESTAURANT`
- `DELIVERY_MAN`
- `CUSTOMER`

## Documentation Map

- Project layout and naming conventions: `docs/PROJECT_STRUCTURE.md`
- Development workflow and standards: `docs/DEVELOPMENT.md`
- Frontend-specific setup: `food-app/README.md`
- API JSON examples (legacy): `README2.md`

## Notes

- Keep secrets and bootstrap credentials in local environment configuration; do not commit production credentials.
- Delivery flow UI/API is currently partial and tracked as ongoing work.

