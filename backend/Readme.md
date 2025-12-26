# Backend API

The core REST API service for the E-Commerce platform, built with Node.js and Express.

## 🚀 Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) w/ [Mongoose](https://mongoosejs.com/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Validation:** [Zod](https://zod.dev/)
- **Payments:** [Stripe](https://stripe.com/)
- **Background Jobs:** [Inngest](https://www.inngest.com/)
- **File Uploads:** [Cloudinary](https://cloudinary.com/) / Multer

## 📂 Project Structure

```text
backend/
├── src/
│   ├── config/           # Configuration (DB, Stripe, Clerk, etc.)
│   ├── controllers/      # Route handlers and business logic
│   ├── jobs/             # Background jobs (Inngest)
│   ├── middleware/       # Express middleware (Auth, Error handling)
│   ├── models/           # Mongoose data models
│   ├── routes/           # API route definitions
│   ├── seeds/            # Data seeding scripts
│   ├── utils/            # Helper utilities
│   ├── validators/       # Zod schemas for input validation
│   └── server.js         # Entry point
└── package.json
```

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (Local or Atlas)
- Stripe Account
- Clerk Account

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your API keys for MongoDB, Clerk, Stripe, etc.

### Development Service

Start the development server with hot-reloading (Node --watch):

```bash
npm run dev
```

The API will be available at `http://localhost:5000` (default port).

### Seeding Data

To populate the database with dummy product data:

```bash
npm run seed:products
```

## 📚 API Documentation

(Optional: Add link to Swagger/Postman docs if available)

- **Base URL:** `/api/v1`
- **Health Check:** `/health`
