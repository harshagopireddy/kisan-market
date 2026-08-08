# Kisan Market Backend

Spring Boot 4.1 / Java 21 REST API for the Kisan Market farmer-to-customer marketplace.

## Tech Stack

- Spring Boot 4.1, Spring MVC, Spring Security + JWT, Spring Data JPA
- MySQL 8
- Maven wrapper (`mvnw`)

## Getting Started

1. Create the database (once):

   ```sql
   CREATE DATABASE IF NOT EXISTS kisan_market;
   ```

2. Configure the DB connection via environment variables (or defaults in `application.properties`):

   | Variable      | Default                             |
   | ------------- | ----------------------------------- |
   | `DB_URL`      | `jdbc:mysql://localhost:3306/kisan_market` |
   | `DB_USERNAME` | `root`                              |
   | `DB_PASSWORD` | *(set this — do not commit real credentials)* |
   | `JWT_SECRET`  | dev-only placeholder (use a long random value in production) |
   | `CORS_ALLOWED_ORIGINS` | `http://localhost:5173,http://localhost:5174` |

3. Run:

   ```bash
   ./mvnw spring-boot:run        # Linux/macOS
   mvnw.cmd spring-boot:run      # Windows
   ```

   Server starts on `http://localhost:8081`.

## Default Admin

A default admin is seeded automatically on first run:

- Email: `admin@kisan.com`
- Password: `admin123`

Change this password after the first login.

## API Overview

| Method | Endpoint                       | Auth                | Description                    |
| ------ | ------------------------------ | ------------------- | ------------------------------ |
| POST   | `/api/users/register`          | Public              | Register (returns JWT)         |
| POST   | `/api/users/login`             | Public              | Login (returns JWT)            |
| GET    | `/api/users/me`                | Bearer token        | Current user                   |
| GET    | `/api/products`                | Public              | List products (newest first)   |
| GET    | `/api/products/{id}`           | Public              | Single product                 |
| GET    | `/api/products/farmer/{id}`    | Public              | Products by farmer             |
| POST   | `/api/products/add`            | FARMER              | Add product                    |
| PUT    | `/api/products/{id}`           | FARMER (owner)      | Update product                 |
| DELETE | `/api/products/{id}`           | FARMER (owner)/ADMIN| Delete product                 |
| POST   | `/api/orders/place`            | Any authenticated   | Place order (decrements stock) |
| GET    | `/api/orders`                  | FARMER/ADMIN        | Farmer sees own; admin sees all|
| GET    | `/api/orders/buyer/{id}`       | CUSTOMER (self)/ADMIN | Customer's orders            |
| PUT    | `/api/orders/status/{id}`      | FARMER (owner)/ADMIN| Update order status            |
| GET    | `/api/admin/stats`             | ADMIN               | Dashboard counts               |
| GET    | `/api/admin/users`             | ADMIN               | List users                     |
| DELETE | `/api/admin/users/{id}`        | ADMIN               | Delete user                    |
| GET    | `/api/admin/products`          | ADMIN               | List products                  |
| DELETE | `/api/admin/products/{id}`     | ADMIN               | Delete product                 |
| GET    | `/api/admin/orders`            | ADMIN               | List orders                    |

All protected endpoints expect `Authorization: Bearer <token>`.

## Notes

- Passwords are hashed with BCrypt; the password is never returned by any endpoint.
- Placing an order validates stock, computes the total server-side, and decrements product quantity.
- The `users12` table from earlier versions was renamed to `users`; migrate any existing data or re-register.
