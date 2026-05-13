# Library Management System

A backend API for managing library operations: authors, books, students, library attendants, borrowing, and returning books.

## Table of Contents

1. Overview
2. Features
3. Tech Stack
4. Project Structure
5. Installation
6. Environment Variables
7. Running the App
8. Quick Usage
9. API Reference
   - Authentication
   - Admin
   - Authors
   - Books
   - Students
   - Library Attendants
10. Data Models
11. Notes
12. Postman Documentation

---

## 1. Overview

This project is a Node.js + Express backend for a library management system. It connects to MongoDB via Mongoose and supports:

- User signup and login
- Role-based access control
- Author creation and management
- Book catalog management
- Student registration
- Library attendant registration
- Book borrowing and returning workflows

---

## 2. Features

- JWT authentication
- Role-based authorization (admin, attendant, student)
- Validation middleware for request payloads
- MongoDB schema models for books, authors, students, attendants, and users
- Borrow / return workflow with book status tracking
- Admin / attendant / student access control
- Email-based attendant invitation system
- Account setup with secure token-based invitations
- Rate-limited endpoints for abuse prevention

---

## 3. Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- Nodemailer (for sending invitation emails)
- express-rate-limit (for request rate limiting)
- dotenv
- validator

---

## 4. Project Structure

Key folders and files:

- `server.js` — entry point
- `config/db.js` — MongoDB connection
- `config/nodeMailer.js` — email configuration
- `routes/` — route definitions
- `controllers/` — request handling logic
- `models/` — Mongoose schemas
- `middleware/` — authentication, authorization, and validation

Included routes:

- `authRoutes.js` — signup, login, setup-account, resend-invite
- `adminRoutes/adminRoute.js` — admin operations
- `authorsRoute.js` — CRUD for authors
- `booksRoute.js` — CRUD for books, borrow, and return operations
- `studentsRoute.js` — CRUD for students
- `libraryAttendantsRoute.js` — retrieve attendants

---

## 5. Installation

```bash
git clone <repository-url>
cd Library-Management-System
npm install
```

---

## 6. Environment Variables

Create a `.env` file in the project root with:

```env
MONGO_URI=<your-mongo-connection-string>
DB_NAME=Library-Management-System
JWT_SECRET=<your-jwt-secret>
PORT=3000
CLIENT_URL=<your-frontend-url>
```

- `PORT` is optional; defaults to `3000`
- `CLIENT_URL` is required for invitation email links (e.g., `http://localhost:3001`)

---

## 7. Running the App

Start the server in development mode:

```bash
npm run dev
```

---

## 8. Quick Usage

### Common `curl` flags

- `-X` or `--request` — set the HTTP method.
  - Example: `-X POST`
- `-H` or `--header` — set an HTTP header.
  - Example: `-H "Content-Type: application/json"`
  - Example: `-H "Authorization: Bearer <JWT token>"`
- `-d` or `--data` — send request body data.
  - Example: `-d '{ "email": "jane@example.com", "password": "strongpassword" }'`

### Example: login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "strongpassword"
  }'
```

### Example: use the token for a protected request

```bash
curl -X GET http://localhost:3000/books \
  -H "Authorization: Bearer <JWT token>"
```

### Example: create a new book (admin/attendant)

```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT token>" \
  -d '{
    "title": "Pride and Prejudice",
    "isbn": "9780141199078",
    "authors": ["<authorId>"]
  }'
```

---

## 9. API Reference

### General HTTP Semantics

- `POST` — creates a new resource or action
- `GET` — retrieves existing resources
- `PUT` — updates an existing resource
- `DELETE` — removes a resource

---

### Authentication

#### POST `/auth/signup`

- Creates a new student user account.
- Request body:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "strongpassword"
  }
  ```
- Response:
  - `201 Created` on success
  - Creates both a `User` record and a `Student` record
  - Student IDs are generated like `STD-0001`

#### POST `/auth/login`

- Authenticates a user and returns a JWT token.
- Request body:
  ```json
  {
    "email": "jane@example.com",
    "password": "strongpassword"
  }
  ```
- Response:
  - `200 OK`
  - Token expires in 30 minutes

#### POST `/auth/setup-account`

- Sets up a user account after receiving an invitation token.
- Used by invited attendants to create their password.
- Request body:
  ```json
  {
    "token": "<invitation-token>",
    "password": "strongpassword"
  }
  ```
- Response:
  - `200 OK` on success
  - Sets `isActive` to `true` and clears invite tokens

#### POST `/auth/resend-invite`

- Resends an invitation email to a user who hasn't set up their account yet.
- Rate limited to 3 requests per 15 minutes.
- Request body:
  ```json
  {
    "email": "attendant@example.com"
  }
  ```
- Response:
  - `200 OK` on success
  - Generates a new invite token valid for 24 hours

---

### Admin

Requires role: `admin`

#### POST `/admin/register/attendants`

- Invites a new library attendant to the system.
- Generates an invitation token and sends an email with account setup link.
- Request body:
  ```json
  {
    "email": "attendant@example.com",
    "name": "Mary Smith"
  }
  ```
- Response:
  - `201 Created` on success
  - Creates a `User` record with role `attendant` and `isActive: false`
  - Creates a corresponding `LibraryAttendant` record
  - Staff IDs are generated like `STF-0001`

#### GET `/admin/users`

- Retrieves all users in the system.
- Response:
  - `200 OK`
  - Returns array of users with `userId`, `email`, `role`, `isActive`, `createdAt`, `updatedAt`

---

### Authors

#### GET `/authors`

- Retrieves all authors.

#### POST `/authors`

- Creates a new author.
- Requires role: `admin` or `attendant`
- Request body:
  ```json
  {
    "name": "Jane Austen",
    "bio": "English novelist"
  }
  ```

#### GET `/authors/:id`

- Retrieves a single author by ID.

#### PUT `/authors/:id`

- Updates an existing author.
- Requires role: `admin` or `attendant`
- Request body:
  ```json
  {
    "name": "Jane Austen",
    "bio": "Renowned English novelist"
  }
  ```

#### DELETE `/authors/:id`

- Deletes an author.
- Requires role: `admin` or `attendant`

---

### Books

#### GET `/books`

- Retrieves all books.

#### GET `/books/:id`

- Retrieves one book by ID, including populated author details.

#### POST `/books`

- Creates a new book.
- Requires role: `admin` or `attendant`
- Request body:
  ```json
  {
    "title": "Pride and Prejudice",
    "isbn": "9780141199078",
    "authors": ["<authorId1>", "<authorId2>"]
  }
  ```

#### PUT `/books/:id`

- Updates an existing book.
- Requires role: `admin` or `attendant`
- Request body:
  ```json
  {
    "title": "Pride and Prejudice (Updated)"
  }
  ```

#### DELETE `/books/:id`

- Deletes a book.
- Requires role: `admin` or `attendant`

#### POST `/books/:id/borrow`

- Creates a borrow action for a book.
- Requires role: `student`
- Request body:
  ```json
  {
    "studentId": "STD-0001",
    "attendantId": "STAFF-0001",
    "returnDate": "2026-05-15"
  }
  ```

#### POST `/books/:id/return`

- Creates a return action for a borrowed book.
- Requires role: `student`
- Request body:
  ```json
  {
    "studentId": "STD-0001"
  }
  ```

---

### Students

#### POST `/students`

- Creates a new student record.
- Requires role: `admin`
- Request body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

#### GET `/students`

- Retrieves all students.

#### GET `/students/:id`

- Retrieves one student by ID.

---

### Library Attendants

#### GET `/attendants`

- Retrieves all library attendants.

#### Note

- New attendants are created through the admin endpoint: `POST /admin/register/attendants`
- Attendants receive an invitation email and must set up their account using `/auth/setup-account`

---

## 10. Data Models

### User

- `email` — unique
- `password` — hashed (null until account is set up)
- `role` — `student` or `attendant`
- `isActive` — boolean, `false` until user completes account setup
- `inviteToken` — temporary token for account setup (expires after 24 hours)
- `inviteExpiry` — expiration timestamp for invite token
- `createdAt` — account creation timestamp
- `updatedAt` — last update timestamp

### Student

- `name`
- `email`
- `studentId`

### Author

- `name`
- `bio`

### Book

- `title`
- `isbn`
- `authors`
- `status` — `IN` or `OUT`
- `borrowedBy`
- `issuedBy`
- `returnDate`

### Library Attendant

- `name`
- `staffId`

---

## 11. Notes

- JWT authentication is enforced on all routes except `/auth/signup`, `/auth/login`, `/auth/setup-account`, and `/auth/resend-invite`
- The `authorization` middleware validates user roles on protected routes
- Input validation protects author, book, student, borrow, and return operations
- Use `MONGO_URI` and `JWT_SECRET` in `.env`
- `npm run dev` uses `nodemon` for live reload
- Attendant invitations expire after 24 hours
- Resend-invite endpoint is rate-limited to 3 requests per 15 minutes to prevent abuse
- Email notifications are sent via Nodemailer when attendants are invited
- Configure `CLIENT_URL` in `.env` for the account setup link in invitation emails

---

## 12. Postman Documentation

Access the Postman collection here:

https://davsaltobi-2856887.postman.co/workspace/David-Oluwatobiloba-Salami's-Wo~605712f2-5d1f-46e6-8d9a-2305c356bc6a/collection/53121321-e55def20-236b-4184-a662-5bc9904c10c8?action=share&creator=53121321
