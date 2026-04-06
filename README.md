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
- Role-based authorization
- Validation middleware for request payloads
- MongoDB schema models for books, authors, students, attendants, and users
- Borrow / return workflow with book status tracking
- Admin / attendant / student access control

---

## 3. Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens
- bcrypt
- dotenv
- validator

---

## 4. Project Structure

Key folders and files:

- `server.js` — entry point
- `config/db.js` — MongoDB connection
- `routes/` — route definitions
- `controllers/` — request handling logic
- `models/` — Mongoose schemas
- `middleware/` — authentication, authorization, and validation

Included routes:

- `authRoutes.js`
- `authorsRoute.js`
- `booksRoute.js`
- `studentsRoute.js`
- `libraryAttendantsRoute.js`

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
```

`PORT` is optional; defaults to `3000`.

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

#### POST `/attendants`

- Creates a new library attendant record.
- Requires role: `admin`
- Request body:
  ```json
  {
    "name": "Mary Smith",
    "staffId": "STAFF-0001"
  }
  ```

#### GET `/attendants`

- Retrieves all library attendants.

---

## 9. Data Models

### User

- `email` — unique
- `password` — hashed
- `role` — `student` or `attendant`

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

## 10. Notes

- JWT authentication is enforced after `/auth`
- The `authorization` middleware validates user roles
- Input validation protects author, book, student, borrow, and return operations
- Use `MONGO_URI` and `JWT_SECRET` in `.env`
- `npm run dev` uses `nodemon` for live reload

---

## 12. Postman Documentation

Access the Postman collection here:

https://davsaltobi-2856887.postman.co/workspace/David-Oluwatobiloba-Salami's-Wo~605712f2-5d1f-46e6-8d9a-2305c356bc6a/collection/53121321-e55def20-236b-4184-a662-5bc9904c10c8?action=share&creator=53121321
