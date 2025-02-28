# Koa REST API

A simple REST API built with Koa that provides authentication (Sign-In / Sign-Up) and CRUD operations for user management.

## Features

- **Authentication**: Sign-In / Sign-Up using JWT.
- **User Management**: Create, Read, Update, and Delete users.
- **Middleware**: Authentication middleware to protect private routes.

## Getting Started

### Installation

```sh
npm install
```

### Running the Server

```sh
npm run dev
```

## API Endpoints

### Authentication

#### Sign-Up

```http
POST /auth/sign-up
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "johndoe@example.com"
}
```

#### Sign-In

```http
POST /auth/sign-in
```

**Request Body:**

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "your_jwt_token"
}
```

### User Management (Protected Routes)

#### Get All Users

```http
GET /users
Authorization: Bearer <token>
```

**Response:**

```json
{
  "users": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "johndoe@example.com"
    }
  ]
}
```

#### Get User by ID

```http
GET /users/:id
Authorization: Bearer <token>
```

**Response:**

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "johndoe@example.com"
}
```

#### Create User

```http
POST /users
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "name": "Jane Doe",
  "email": "janedoe@example.com"
}
```

**Response:**

```json
{
  "id": "2",
  "name": "Jane Doe",
  "email": "janedoe@example.com"
}
```

#### Update User

```http
PATCH /users/:id
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "name": "Updated Name"
}
```

**Response:**

```json
{
  "id": "1",
  "name": "Updated Name",
  "email": "johndoe@example.com"
}
```

#### Delete User

```http
DELETE /users/:id
Authorization: Bearer <token>
```

**Response:**

```json
{
  "message": "User deleted successfully"
}
```

## Notes

- **No `.env` file required** since default values are used from the `config` file.
- JWT tokens are required for protected routes (`/users`).
- `ctx.throw()` is used for error handling.
