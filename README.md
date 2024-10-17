# Voucher Pool Backend Coding Challenge

## Overview

This is a backend service built using [NestJS](https://nestjs.com/) to manage a voucher pool for customers. The service allows generating voucher codes for customers, validating them, and retrieving valid vouchers. The service exposes a REST API and can be set up easily using Docker.

### Key Features:

- **Generate Voucher Codes**: Automatically generate unique voucher codes for customers based on special offers.
- **Voucher Validation**: Validate voucher codes by checking if they are assigned to a specific customer and haven't been used or expired.
- **Voucher Retrieval**: Retrieve all valid vouchers for a specific customer by their email.
- **Rate Limiting**: Prevent abuse by implementing API rate limiting.
- **Database Transactions**: Ensure data consistency with the use of transactions.
- **Unit Tests**: Includes unit tests for core functionalities.
- **Swagger Documentation** (optional): Auto-generated API documentation with Swagger.
- **Docker Setup**: Full Docker setup to run the application with all dependencies.

## Features & Functionalities

### Entities

1. **Customer**:

   - Name
   - Email (unique)

2. **Special Offer**:

   - Name
   - Fixed percentage discount

3. **Voucher Code**:
   - Unique randomly generated code (at least 8 characters)
   - Assigned to a customer and a special offer
   - Expiration date
   - Can only be used once
   - Tracks the date of usage

### API Functionalities

1. **Generate Voucher Code**:

   - Generate voucher codes for each customer for a given special offer and expiration date.

2. **Validate and Redeem Voucher**:

   - Endpoint to validate a voucher using the voucher code and customer email. If valid, return the discount and mark the voucher as used.

3. **Retrieve All Valid Vouchers**:
   - Endpoint to retrieve all valid voucher codes for a given email, along with the name of the special offer.

### Plus Features:

- **API Rate Limiting**: Protects the API from abuse by limiting the number of requests per customer.
- **Swagger Documentation**: Auto-generated Swagger documentation for all API endpoints.
- **Docker Support**: The entire application can be set up using Docker, including PostgreSQL as the database.

## Installation & Setup

### Prerequisites

- **Node.js** (version 18.x or above)
- **Docker** (for containerized setup)
- **PostgreSQL** (if not using Docker)

### Local Development

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/MuhamedOsama/holo-assesment.git
   cd voucher-pool
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory of the project with the following variables:

   ```bash
   DATABASE_URL=postgresql://postgres:1111@localhost:5432/holo-db?schema=public
   ```

4. **Run Migrations**:

   ```bash
   npx prisma migrate dev
   ```

5. **Start the Application**:

   ```bash
   npm run start:dev
   ```

6. **Access the Application**:
   - The app will be running on `http://localhost:3000`.
   - Swagger API documentation (if enabled) can be accessed at `http://localhost:3000/api`.

### Running with Docker

1. **Build and Run Containers**:
   Run the following command to start the entire stack (Node.js app + PostgreSQL) using Docker:

   ```bash
   docker-compose up --build
   ```

2. **Access the Application**:
   - The app will be running on `http://localhost:3000`.
   - Swagger API documentation (if enabled) can be accessed at `http://localhost:3000/api`.

### Database

The application uses PostgreSQL as the database. By default, the Docker setup runs PostgreSQL on port `5432` with the following credentials:

- **Username**: `postgres`
- **Password**: `1111`
- **Database**: `holo-db`

You can change these values in the `docker-compose.yml` file.

### Prisma (ORM)

Prisma is used as the ORM for interacting with the database. You can use Prisma to run migrations, generate the Prisma client, and manage the schema.

#### Running Prisma Migrations

Run the following command to apply migrations:

```bash
npx prisma migrate deploy
```

To generate the Prisma client, run:

```bash
npx prisma generate
```

### Unit Tests

To run the unit tests, use the following command:

```bash
npm run test
```

### API Endpoints

- **Endpoint:** `POST /voucher/generate`
- **Request Body:**
  ```json
  {
    "customerId": "string",
    "offerId": "string",
    "expirationDate": "ISO8601 date string"
  }
  ```
- **Response:**
  ```json
  {
    "id": "string",
    "code": "string",
    "customerId": "string",
    "specialOfferId": "string",
    "expirationDate": "ISO8601 date string",
    "dateUsed": "ISO8601 date string or null",
    "isUsed": "boolean",
    "specialOffer": {
      "name": "string",
      "fixedPercentageDiscount": "number"
    }
  }
  ```

### Redeem Voucher

- **Endpoint:** `POST /voucher/redeem`
- **Request Body:**
  ```json
  {
    "code": "string",
    "email": "string"
  }
  ```
- **Response:**
  ```json
  {
    "id": "string",
    "code": "string",
    "customerId": "string",
    "specialOfferId": "string",
    "expirationDate": "ISO8601 date string",
    "dateUsed": "ISO8601 date string",
    "isUsed": "boolean",
    "specialOffer": {
      "name": "string",
      "fixedPercentageDiscount": "number"
    }
  }
  ```

### Get Customer Vouchers

- **Endpoint:** `GET /voucher/customer/:email`
- **Response:**
  ```json
  [
    {
      "code": "string",
      "expirationDate": "ISO8601 date string",
      "isUsed": "boolean",
      "specialOfferName": "string"
    }
  ]
  ```

### Swagger Documentation

The Swagger documentation (if enabled) is available at `http://localhost:3000/api`. It provides detailed information about all available API endpoints, request and response formats, and example usage.

### Rate Limiting

Rate limiting is implemented to avoid abuse. You can adjust the rate limit in the NestJS configuration file to suit your needs.

## Dockerfile

The Dockerfile is already set up for multi-stage builds to optimize production builds, with Prisma migrations being applied before the app starts.

```dockerfile
# Use official Node.js image as a build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Generate Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the entire project
COPY . .

# Build the project
RUN npm run build

# Final stage: production
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/prisma ./prisma

# Apply Prisma migrations
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
```

## Future Improvements

1. **Authentication and Security**:
   Implement JWT-based authentication to ensure secure access to the voucher API.

2. **Customizable Voucher Generation**:
   Introduce support for customizable voucher generation patterns (e.g., alphanumeric, configurable lengths) and batch generation for large-scale campaigns. This would improve flexibility and scalability for marketing initiatives.

3. **Caching and Performance**:
   Utilize Redis for caching frequently accessed data like customer vouchers to reduce database load and improve response times but also take care of invalidation scenarios.

---
