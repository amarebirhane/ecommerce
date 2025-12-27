# Admin Dashboard (Frontend)

A modern, responsive admin dashboard built with **React 19** and **Vite**, designed to manage the E-Commerce platform's products, orders, and customers.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **State Management & Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
- **Authentication:** [Clerk](https://clerk.com/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Monitoring:** [Sentry](https://sentry.io/)

## 📂 Project Structure

```text
frontend/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── layouts/          # Page layouts (e.g., DashboardLayout)
│   ├── lib/              # Utilities and API clients (axios, utils)
│   ├── pages/            # Application pages (Dashboard, Products, Orders, etc.)
│   ├── App.jsx           # Root component with routing configuration
│   └── main.jsx          # Application entry point
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites

Ensure you have **Node.js** (v18+ recommended) installed on your machine.

### 2. Installation

Navigate to the frontend directory and install the dependencies:

```bash
cd frontend
npm install
```

### 3. Environment Setup

Create a `.env` file in the root of the `frontend` directory and add your environment variables:

```env
# Clerk Authentication - Get from https://dashboard.clerk.com
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here

# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Sentry Error Tracking (Optional)
VITE_SENTRY_DSN=your_sentry_dsn_here
```

**Important:** 
- Make sure your backend server is running on port 5000 (or update the URL accordingly)
- The backend server must have CORS enabled for `http://localhost:5173`
- Your Clerk account email must match the `ADMIN_EMAIL` in your backend `.env` file for admin access

### 4. Running the Development Server

Start the local development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### 5. Building for Production

To create a production-ready build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📦 Key Features

- **Dashboard:** Overview of key metrics and statistics.
- **Product Management:** Create, view, update, and delete products with image uploads.
- **Order Management:** View and update order statuses.
- **Customer Management:** View customer details and history.
- **Authentication:** Secure login for admin users via Clerk.
