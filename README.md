# 🌾 Kisan Market – Online Agricultural Marketplace

## Overview

Kisan Market is a full-stack online agricultural marketplace that directly connects farmers with customers.

The platform allows farmers to register, add and manage their agricultural products, while customers can browse available products, view farmer details, and place orders. The system also provides role-based access for Farmers, Customers, and Admins to ensure secure and organized platform management.

The application is built using React.js for the frontend, Spring Boot for the backend, and MySQL for database management.

---

## 🚀 Live Demo

[Live Demo](#)

---

## Features

### 🔐 Authentication & Authorization

* User Registration
* User Login
* JWT-Based Authentication
* Role-Based Access Control
* Support for Farmer, Customer, and Admin roles
* Secure Password Encryption using BCrypt
* Protected Routes
* Secure API Endpoints

---

### 👨‍🌾 Farmer Module

* Farmer Registration and Login
* Farmer Dashboard
* Add Agricultural Products
* View Own Products
* Edit Product Information
* Delete Products
* View Customer Orders
* Track Order Status
* Manage Products and Orders

---

### 🛒 Customer Module

* Customer Registration and Login
* Customer Dashboard
* Browse Agricultural Products
* View Product Details
* View Farmer Contact Information
* Place Orders
* View Orders
* Track Order Status
* Location-Based Product Delivery

---

### 👨‍💼 Admin Module

* Admin Login
* Admin Dashboard
* Manage Users
* Manage Farmers and Customers
* Manage Products
* Manage Orders
* View Platform Statistics
* Role-Based Administrative Access

---

### 📦 Product Management

* Add Agricultural Products
* View Available Products
* Update Product Details
* Delete Products
* Product Information Management
* Farmer-Specific Product Management
* Product Availability Management

---

### 🚚 Order Management

* Customers can place orders
* Farmers can view customer orders
* Order status management
* Order tracking
* Customer and farmer order information
* Location-based delivery support

---

## Technology Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* HTML5
* CSS3
* JavaScript

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* REST APIs
* Spring Security
* JWT Authentication
* BCrypt Password Encryption
* Maven

### Database

* MySQL

### Tools

* Git
* GitHub
* Postman
* IntelliJ IDEA
* Visual Studio Code

---

## 🏗️ Project Architecture

```text
                 Kisan Market
                      │
                      ▼
             React.js Frontend
                      │
                      │ HTTP / REST APIs
                      ▼
              Spring Boot Backend
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
    Spring Security          REST APIs
          │
          ▼
       JWT Auth
                      │
                      ▼
                MySQL Database
```
## 👥 User Roles

### 👨‍🌾 Farmer

Farmers can:

* Register and login
* Add agricultural products
* View their own products
* Edit product information
* Delete products
* View customer orders
* Manage order status

### 🛒 Customer

Customers can:

* Register and login
* Browse agricultural products
* View product details
* View farmer contact information
* Place orders
* View their orders
* Track order status
* Provide delivery location

### 👨‍💼 Admin

Admins can:

* Login securely
* View all users
* Manage users
* View and manage products
* View and manage orders
* Monitor marketplace activities
* View platform statistics

---

## 🗄️ Database Entities

### User

* id
* name
* email
* password
* role

### Product

* id
* name
* description
* price
* quantity
* category
* location
* farmerId

### Order

* id
* productId
* customerId
* farmerId
* quantity
* totalPrice
* status
* orderDate
* deliveryLocation

---

## 🔗 API Modules

### Authentication APIs

* Register User
* Login User

### Product APIs

* Add Product
* Get All Products
* Get Product by ID
* Get Farmer Products
* Update Product
* Delete Product

### Order APIs

* Place Order
* Get Customer Orders
* Get Farmer Orders
* Update Order Status
* Get Order Details

### Admin APIs

* Get Users
* Manage Users
* Get Products
* Manage Products
* Get Orders
* Manage Orders
* Get Platform Statistics

---

## 🔒 Security Features

* JWT-Based Authentication
* BCrypt Password Encryption
* Role-Based Authorization
* Protected Frontend Routes
* Protected Backend APIs
* CORS Configuration
* Input Validation
* User Role Verification
* Secure Authentication Flow

---

## 📱 Frontend Modules

```text
Authentication
├── Login
└── Register

Farmer
├── Farmer Dashboard
├── Add Product
├── My Products
├── Edit Product
└── My Orders

Customer
├── Customer Dashboard
├── Browse Products
├── Product Details
└── My Orders

Admin
├── Admin Dashboard
├── Manage Users
├── Manage Products
└── Manage Orders
