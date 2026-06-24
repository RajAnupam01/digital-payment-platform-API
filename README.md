# 🚀 Tap&Go

> A secure digital wallet backend platform inspired by modern UPI and digital payment systems, built with scalable Node.js architecture, JWT authentication, KYC verification, account management, transaction processing, notifications, and ledger tracking.

Tap&Go enables users to register, verify accounts using OTP, complete KYC, create bank accounts, manage beneficiaries, transfer money securely via UPI IDs, track transaction history, receive notifications, and maintain complete account ledgers.

---

# 📌 Project Status

✅ Backend Development Completed

✅ MongoDB Atlas Database Integrated

✅ JWT Authentication & Refresh Token Rotation Implemented

✅ OTP Verification Workflow Implemented

✅ KYC Verification System Implemented

✅ Digital Wallet & Bank Account Management Implemented

✅ Beneficiary Management Implemented

✅ Transaction Processing System Implemented

✅ Account Ledger Tracking Implemented

✅ Notification System Implemented

✅ Swagger API Documentation Implemented

🚧 Deployment In Progress

🚧 Frontend Not Planned (Backend Portfolio Project)

---

# ✨ Features

## 🔐 Authentication & Security

* User Registration
* OTP Verification
* User Login
* JWT Access Tokens
* Refresh Tokens
* Refresh Token Rotation
* Logout Functionality
* Protected Routes
* Password Encryption using Bcrypt
* PIN Encryption using Bcrypt
* Rate Limiting
* Centralized Error Handling
* Request Validation using Zod

---

## 👤 User Management

* User Registration
* User Login
* Profile Retrieval
* Profile Update
* Password Change
* Account Deletion
* Forgot Password Workflow
* Reset PIN Workflow
* Account Verification Status
* Account Status Management

---

## 🪪 KYC Verification

* Complete KYC Process
* Bank Account Linking
* UPI ID Generation
* Secure Transaction PIN Setup
* KYC Verification Notifications

---

## 🏦 Bank Account Management

* Create Wallet Account
* View Account Details
* Check Available Balance
* Freeze Account
* Unfreeze Account
* Last Transaction Tracking

---

## 👥 Beneficiary Management

* Add Beneficiary
* Remove Beneficiary
* View Beneficiary List
* Beneficiary Validation

---

## 💸 Money Transfer System

* UPI-Based Transfers
* PIN Verification
* Self Transfer Prevention
* Insufficient Balance Checks
* Receiver Validation
* Transaction Failure Handling
* Transaction Success Tracking
* Automatic Ledger Creation
* Transaction Notifications

---

## 📒 Account Ledger

* Debit Entry Tracking
* Credit Entry Tracking
* Balance Before Transaction
* Balance After Transaction
* Transaction Linking
* Account History Tracking

---

## 🔔 Notifications

Centralized notification system for:

* Account Verification
* KYC Verification
* Money Sent
* Money Received
* PIN Changes
* Transaction Failures

---

# 🏗️ Tech Stack

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose ODM

## Authentication

* JWT Access Tokens
* JWT Refresh Tokens

## Validation

* Zod

## Documentation

* Swagger / OpenAPI

## Security

* Bcrypt
* Rate Limiting

---

# ☁️ System Architecture

```text
                    ┌──────────────────┐
                    │ Swagger UI       │
                    │ Postman Client   │
                    └─────────┬────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Node.js + Express│
                    │ REST API Server  │
                    └──────┬───────────┘
                           │
                           ▼
                ┌────────────────────────┐
                │ Authentication Layer   │
                │ JWT + Refresh Tokens   │
                └──────────┬─────────────┘
                           │
                           ▼
                ┌────────────────────────┐
                │ Business Logic Layer   │
                │ Services              │
                └──────────┬─────────────┘
                           │
                           ▼
                ┌────────────────────────┐
                │ MongoDB Atlas          │
                │ Mongoose ODM           │
                └────────────────────────┘
```

---

# 📂 Repository Structure

```bash
Tap&Go/
│
├── client/
│
└── server/
```

---

# 📂 Backend Structure

```bash
server/
│
├── src/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── accountLedger.controller.js
│   ├── auth.controller.js
│   ├── bankAccount.controller.js
│   ├── beneficiary.controller.js
│   ├── kyc.controller.js
│   ├── notification.controller.js
│   ├── transaction.controller.js
│   └── user.controller.js
│
├── docs/
│   ├── swagger.js
│   ├── auth.swagger.js
│   ├── user.swagger.js
│   ├── kyc.swagger.js
│   ├── bankAccount.swagger.js
│   ├── beneficiary.swagger.js
│   ├── transaction.swagger.js
│   ├── notification.swagger.js
│   └── accountLedger.swagger.js
│
├── helper/
│   └── rateLimiter.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── validate.js
│
├── models/
│   ├── user.model.js
│   ├── refreshToken.model.js
│   ├── otp.model.js
│   ├── bankAccount.model.js
│   ├── transaction.model.js
│   ├── beneficiary.model.js
│   ├── notification.model.js
│   └── accountLedger.model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── kyc.routes.js
│   ├── bankAccount.routes.js
│   ├── beneficiary.routes.js
│   ├── transaction.routes.js
│   ├── notification.routes.js
│   └── accountLedger.routes.js
│
├── services/
│   ├── auth.service.js
│   ├── user.service.js
│   ├── kyc.service.js
│   ├── bankAccount.service.js
│   ├── beneficiary.service.js
│   ├── transaction.service.js
│   ├── notification.service.js
│   └── accountLedger.service.js
│
├── utils/
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── AsyncHandler.js
│   └── token.util.js
│
├── validations/
│   ├── auth.validation.js
│   ├── kyc.validation.js
│   ├── refreshTokenValidation.js
│   ├── transaction.validate.js
│   └── user.validation.js
│
├── app.js
├── index.js
├── package.json
├── package-lock.json
└── .env
```

---

# 🔄 Request Flow

```text
Client
 │
 ▼
Routes
 │
 ▼
Middlewares
(Auth / Validation / Rate Limiting)
 │
 ▼
Controllers
 │
 ▼
Services
 │
 ▼
Mongoose Models
 │
 ▼
MongoDB Atlas
```

---

# 🗄️ Database Collections

Core collections include:

* Users
* Refresh Tokens
* OTPs
* Bank Accounts
* Transactions
* Beneficiaries
* Notifications
* Account Ledgers

### Database Schema Diagram

> Add MongoDB Schema Diagram Here

---

# 🔒 Security Features

* JWT Authentication
* Refresh Token Rotation
* Bcrypt Password Hashing
* Bcrypt PIN Hashing
* Protected Routes
* Input Validation using Zod
* Rate Limiting
* Centralized Error Handling
* Account Status Validation
* Secure OTP Verification

---

# ⚡ Performance Optimizations

* MongoDB Indexing
* TTL Index for Refresh Tokens
* Indexed Phone Numbers
* Indexed UPI IDs
* Indexed Transaction IDs
* Lean Service Layer Architecture
* Modular Code Structure

---

# 📖 API Documentation

Swagger documentation is included for all modules.

After running the application:

```bash
http://localhost:1111/api-docs
```

Documented APIs include:

* Authentication
* Users
* KYC
* Bank Accounts
* Beneficiaries
* Transactions
* Notifications
* Account Ledger

---

# 🛠️ Environment Variables

Create a `.env` file inside the server directory:

```env
PORT=1111

MONGODB_URI=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_EXPIRY=
```

---

# 🚀 Local Setup

### Clone Repository

```bash
git clone https://github.com/yourusername/tap-and-go.git
```

### Navigate to Backend

```bash
cd tap-and-go/server
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

---

# 🌐 Deployment

### Backend Hosting

* Render

### Database

* MongoDB Atlas

---

# 🚧 Future Improvements

* RBAC (Role Based Access Control)
* Admin Dashboard APIs
* Scheduled Transactions
* Wallet Top-Up System
* Withdrawal System
* Transaction Analytics
* Fraud Detection Rules
* Real-Time Notifications
* SMS OTP Integration

---

# 👨‍💻 Author

**Anupam Raj**

Full Stack Developer focused on building scalable backend systems, REST APIs, secure authentication workflows, payment systems, and modern web applications using Node.js, Express.js, MongoDB, React, and React Native.

---

# ⭐ Support

If you found this project useful, consider giving it a star ⭐ and sharing your feedback.
