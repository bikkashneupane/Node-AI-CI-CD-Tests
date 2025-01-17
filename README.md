# Microservices Project: Node.js CI/CD and Tests

## Overview

This project is a Node.js-based microservices architecture consisting of the following services:

- **API Gateway**: Acts as an entry point for the microservices.
- **Book Service**: Handles operations related to books.
- **Chat Service**: Manages chat functionalities with AI integration.
- **User Service**: Manages user authentication, sessions, and related functionalities.

The project includes CI/CD pipelines, unit tests, and integration with tools like Jest and Redis to ensure scalability and maintainability.

---

## Directory Structure

```
.
└── bikkashneupane-node-ai-ci-cd-tests/
    ├── api-gateway/
    ├── book-service/
    ├── chat-service/
    ├── user-service/
    └── .github/
```

### 1. API Gateway

Path: `api-gateway/`

- **Description**: Central point for routing requests to respective microservices.
- **Key Files:**
  - `server.ts`: Main entry file.
  - `tests/index.test.ts`: Contains test cases for the gateway.
  - `tsconfig.json`: TypeScript configuration.

### 2. Book Service

Path: `book-service/`

- **Description**: Manages book-related CRUD operations.
- **Key Files:**
  - `src/controllers/books.ts`: Handles book endpoints logic.
  - `src/routes/books.ts`: Defines book-related routes.
  - `tests/books.test.ts`: Contains unit tests for book functionalities.
  - `src/utils/redis.ts`: Redis integration for caching.

### 3. Chat Service

Path: `chat-service/`

- **Description**: Provides chat functionalities with AI integration.
- **Key Files:**
  - `src/routes/chat.ts`: Defines chat-related routes.
  - `src/config/openaiConfig.ts`: Configuration for OpenAI API.
  - `tests/src/index.test.ts`: Unit tests for chat functionalities.

### 4. User Service

Path: `user-service/`

- **Description**: Manages user-related operations, including authentication and session handling.
- **Key Files:**
  - `src/controllers/user.ts`: Handles user CRUD operations.
  - `src/controllers/session.ts`: Handles session-related logic.
  - `src/utils/bcrypt.ts` and `src/utils/jwt.ts`: Utility files for password hashing and token generation.

---

## CI/CD Workflow

Path: `.github/workflows/ci.yml`

- **Description**: Automates testing and deployment pipelines.
- **Key Steps:**
  - Checkout code.
  - Setup Node.js environment.
  - Install dependencies and build services.
  - Run test cases using Jest.
  - Cache dependencies for faster CI runs.

---

## Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (via Mongoose), Redis
- **Testing**: Jest, Supertest
- **CI/CD**: GitHub Actions
- **Utilities**: Joi (Validation), Bcrypt (Hashing), JSON Web Token (Authentication), OpenAI API

---

## Prerequisites

Ensure the following are installed:

- Node.js (v18 or higher)
- npm (v8 or higher)
- MongoDB
- Redis

---

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/bikkashneupane/bikkashneupane-node-ai-ci-cd-tests.git
   cd bikkashneupane-node-ai-ci-cd-tests
   ```

2. **Install Dependencies:**
   For each service (e.g., `api-gateway`, `book-service`, etc.), run:

   ```bash
   cd <service-folder>
   npm install
   ```

3. **Environment Variables:**
   Create `.env` files for each service in their respective `src/config/` directories. Example:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/<database-name>
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   OPENAI_API_KEY=your_openai_api_key
   JWT_SECRET=your_jwt_secret
   ```

4. **Run Services:**
   Use the following commands to start each service:

   ```bash
   npm run dev
   ```

5. **Run Tests:**
   Execute tests for each service using:
   ```bash
   npx jest ./tests
   ```

---

## API Documentation

### API Gateway

- **Base URL:** `http://localhost:3000`
- **Endpoints:**
  - `/api/books` - Routes to Book Service
  - `/api/chat` - Routes to Chat Service
  - `/api/users` - Routes to User Service

### Book Service

- **Base URL:** `http://localhost:3001`
- **Endpoints:**
  - `GET /books` - Fetch all books
  - `POST /books` - Add a new book

### Chat Service

- **Base URL:** `http://localhost:3002`
- **Endpoints:**
  - `POST /chat` - Send a chat message

### User Service

- **Base URL:** `http://localhost:3003`
- **Endpoints:**
  - `POST /users` - Register a user
  - `POST /sessions` - Login a user

---

## Contribution Guidelines

1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Commit your changes and open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Bikash Neupane**

- GitHub: [bikkashneupane](https://github.com/bikkashneupane)
- Website: [bikashneupane.com](https://bikashneupane.com)
