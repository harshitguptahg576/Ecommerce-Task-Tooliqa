# E-Commerce Task (Tooliqa)

A robust e-commerce analytics platform built with Node.js, Express, and Sequelize ORM. This platform provides real-time analytics, inventory management, and order processing capabilities with WebSocket integration for live updates.

## Features

- 🔐 User Authentication & Authorization
- 📦 Product Management
- 🛒 Order Processing
- 🔄 Real-time Inventory Updates (WebSocket)
- 📝 System Logging
- 🔍 API Documentation (Swagger)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT
- **Documentation**: Swagger/OpenAPI 3.0
- **Real-time**: Socket.IO
- **Validation**: Joi

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

## Getting Started

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL = "postgresql://postgres:2345@localhost:5432/postgres"

# JWT
JWT_SECRET=your_jwt_secret

# Swagger
SWAGGER_API_URL = "http://localhost:3001"

```
