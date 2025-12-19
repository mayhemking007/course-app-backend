# Course Selling App – Backend

This repository contains the **backend implementation** of a Course Selling Application built using **Node.js** and **Express.js**.  
The project focuses on authentication, authorization, and core data models for users, admins, and courses.

> ⚠️ **Note:** This repository includes **backend only**.  
> **Frontend and purchase flow are not implemented yet.**

---

## 🚀 Tech Stack

- **Node.js** – Runtime environment  
- **Express.js** – Routing and server framework  
- **MongoDB** – Database  
- **Mongoose** – MongoDB ODM  
- **JWT (JSON Web Token)** – Authentication & authorization  
- **bcrypt** – Password hashing  

---

## 📌 Features Implemented

### 🔐 Authentication & Authorization
- User **Sign Up / Sign In**
- Admin **Sign Up / Sign In**
- Password hashing using **bcrypt**
- Token-based authentication using **JWT**
- Protected routes using authentication middleware

### 👥 User Roles

- **Admin**
  - Can create and manage courses

- **User**
  - Can view available courses
  - Purchase functionality planned (not implemented)

---

## 🗂️ Database Models

The application uses **four MongoDB collections**:

1. **User** – Stores user credentials and profile data  
2. **Admin** – Stores admin credentials  
3. **Course** – Stores course details created by admins  
4. **Purchase** – Schema created 

---

## 🔑 Authentication Flow

- User/Admin logs in using email and password
- Passwords are securely hashed using **bcrypt**
- On successful authentication, a **JWT token** is generated
- Token must be sent in request headers to access protected routes

---

