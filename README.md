# Koa REST API

A simple REST API built with Koa that provides authentication (Sign-In / Sign-Up) and CRUD operations for user management.

## Features

- **Authentication**: Sign-In / Sign-Up using JWT.
- **User Management**: Create, Read, Update, and Delete users.
- **Task Management**: Create, Read, Update, and Delete tasks.
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

## Notes

- **No `.env` file required** since default values are used from the `config` file.
- JWT tokens are required for protected routes (`/users`).
- `ctx.throw()` is used for error handling.
