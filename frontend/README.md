# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


Below is a complete, production-grade AI prompt you can copy-paste into ChatGPT / Cursor / Copilot / Devin-style agents to generate a full E-Commerce system.
It explicitly defines actors, responsibilities, architecture, constraints, and deliverables.

📌 MASTER PROMPT — FULL E-COMMERCE PLATFORM
🎯 Objective

Build a fully functional, production-ready E-Commerce mobile application with an admin dashboard and backend API, using modern best practices, security, scalability, and clean architecture.

👥 ACTORS & ROLES (MANDATORY)
1. Customer (End User)

Browses products

Searches & filters products

Views product details with image slider

Adds/removes items from cart

Manages favorites (wishlist)

Manages delivery addresses

Completes checkout

Pays via Stripe

Views order history & order status

Signs in via Google & Apple

Securely logs out

2. Admin

Secure admin login

Access admin-only protected routes

Manage products (CRUD)

Upload & manage product images

Manage prices, discounts, stock

View & manage orders

Update order status

View customer list & profiles

View dashboard analytics

Monitor system errors

Manage refunds (Stripe)

View revenue, sales, and activity stats

3. System / Backend Services

Authentication & authorization

Role-based access control (Admin / Customer)

Order processing

Payment confirmation

Background jobs

Analytics aggregation

Error monitoring

Image storage

Caching & performance optimization

4. External Services

Clerk → Authentication (Google & Apple)

Stripe → Payments

Inngest → Background jobs

Sentry → Error monitoring

Sevalla → Deployment

GitHub → Version control & CI

CodeRabbit → PR analysis

🧱 TECH STACK (STRICT)
Frontend (Mobile App)

React Native

Expo

TypeScript

TanStack Query (data fetching & caching)

Stripe React Native SDK

Clerk React Native SDK

Admin Dashboard

React (or Next.js)

TypeScript

Secure admin authentication

Charts for analytics

Table views for orders, products, customers

Backend API

Node.js

Express.js

REST API architecture

JWT / Clerk auth middleware

Role-based authorization

Stripe Webhooks

Image handling (upload & storage)

Inngest background jobs

🔐 AUTHENTICATION & SECURITY

Clerk authentication (Google & Apple)

Secure token validation on backend

Role-based access (Admin vs Customer)

Admin-only protected routes

Stripe webhook verification

Secure environment variables

Input validation & sanitization

🛒 CORE FEATURES (REQUIRED)
Customer Features

Product listing

Product detail page with image slider

Cart management

Favorites (wishlist)

Address management

Checkout flow

Stripe payment integration

Order confirmation

Order history

Admin Features

Product CRUD

Image upload & management

Order management

Customer management

Dashboard with live analytics

Revenue & sales statistics

⚙️ BACKEND FUNCTIONALITY

REST API with versioning

Modular folder structure

Controllers, services, routes, middleware

Auth & role middleware

Stripe payment intents

Stripe webhooks for order confirmation

Inngest background jobs:

Order processing

Email notifications (placeholder)

Analytics updates

Sentry error tracking

📦 DATA MODELS (MINIMUM)

User

Product

ProductImage

Cart

CartItem

Order

OrderItem

Address

Payment

Admin

AnalyticsStats

🧭 DASHBOARD & ANALYTICS

Live sales count

Revenue tracking

Orders per day/week/month

Top products

Active customers

Error logs (via Sentry)

🚀 DEPLOYMENT

Deploy API on Sevalla

Deploy Admin Dashboard on Sevalla

Environment-based configuration

Production-ready builds

🧰 DEV WORKFLOW (MANDATORY)

Git & GitHub

Feature branches

Conventional commits

Pull Requests

Code reviews

CodeRabbit PR analysis:

Security issues

Performance

Code quality

Best practices

📐 QUALITY STANDARDS

Clean architecture

Reusable components

Type safety everywhere

Error handling in all layers

Loading & empty states

Optimized API calls

Caching with TanStack Query

Scalable folder structure

Clear comments & documentation

📤 FINAL DELIVERABLES

React Native Expo mobile app

Admin dashboard

Node.js REST API

Stripe integration

Clerk authentication

Inngest background jobs

Sentry monitoring

Deployment setup

GitHub repository structure

Documentation (README + API docs)

🧠 AI INSTRUCTIONS

Generate real, production-ready code

Do NOT simplify logic

Do NOT omit security

Do NOT use mock APIs

Follow best practices

Assume real users and real payments

Output structured, readable, maintainable code


backend/
├── src/
│   ├── app.ts                     # Express app setup
│   ├── server.ts                  # Server bootstrap
│
│   ├── config/
│   │   ├── env.ts                 # Environment variables
│   │   ├── db.ts                  # Database connection
│   │   ├── stripe.ts              # Stripe config
│   │   ├── clerk.ts               # Clerk config
│   │   ├── inngest.ts             # Inngest client
│   │   └── sentry.ts              # Sentry setup
│
│   ├── constants/
│   │   ├── roles.ts               # Admin / Customer roles
│   │   ├── order-status.ts
│   │   └── error-codes.ts
│
│   ├── middlewares/
│   │   ├── auth.middleware.ts     # Clerk auth validation
│   │   ├── role.middleware.ts     # Role-based access
│   │   ├── error.middleware.ts    # Global error handler
│   │   ├── validation.middleware.ts
│   │   └── rate-limit.middleware.ts
│
│   ├── modules/                   # Feature-based architecture
│   │
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.routes.ts
│   │
│   │   ├── users/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.model.ts
│   │   │   └── user.routes.ts
│   │
│   │   ├── products/
│   │   │   ├── product.controller.ts
│   │   │   ├── product.service.ts
│   │   │   ├── product.model.ts
│   │   │   ├── product.validation.ts
│   │   │   └── product.routes.ts
│   │
│   │   ├── cart/
│   │   │   ├── cart.controller.ts
│   │   │   ├── cart.service.ts
│   │   │   ├── cart.model.ts
│   │   │   └── cart.routes.ts
│   │
│   │   ├── orders/
│   │   │   ├── order.controller.ts
│   │   │   ├── order.service.ts
│   │   │   ├── order.model.ts
│   │   │   ├── order.webhook.ts    # Stripe webhooks
│   │   │   └── order.routes.ts
│   │
│   │   ├── addresses/
│   │   │   ├── address.controller.ts
│   │   │   ├── address.service.ts
│   │   │   ├── address.model.ts
│   │   │   └── address.routes.ts
│   │
│   │   ├── payments/
│   │   │   ├── payment.service.ts
│   │   │   ├── payment.routes.ts
│   │   │   └── stripe.webhooks.ts
│   │
│   │   ├── analytics/
│   │   │   ├── analytics.controller.ts
│   │   │   ├── analytics.service.ts
│   │   │   └── analytics.routes.ts
│   │
│   │   └── admin/
│   │       ├── admin.controller.ts
│   │       ├── admin.service.ts
│   │       └── admin.routes.ts
│
│   ├── jobs/
│   │   ├── order-processing.job.ts
│   │   ├── analytics.job.ts
│   │   └── notification.job.ts
│
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── api-response.ts
│   │   ├── async-handler.ts
│   │   └── file-upload.ts
│
│   ├── routes.ts                 # Central router
│   └── types/
│       ├── express.d.ts
│       └── global.d.ts
│
├── prisma/ (or migrations/)
│   ├── schema.prisma
│   └── migrations/
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md

frontend/
├── src/
│   ├── app/ (Next.js App Router)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── admin/
│   │       ├── dashboard/
│   │       │   └── page.tsx
│   │       ├── products/
│   │       ├── orders/
│   │       ├── customers/
│   │       └── analytics/
│
│   ├── components/
│   │   ├── ui/
│   │   ├── tables/
│   │   ├── charts/
│   │   └── layout/
│
│   ├── features/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── customers/
│   │   └── analytics/
│
│   ├── services/
│   │   ├── api-client.ts
│   │   └── auth.service.ts
│
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── usePagination.ts
│
│   ├── lib/
│   │   ├── axios.ts
│   │   ├── stripe.ts
│   │   └── clerk.ts
│
│   ├── store/
│   │   └── admin.store.ts
│
│   ├── styles/
│   │   └── globals.css
│
│   ├── types/
│   └── utils/
│
├── public/
├── middleware.ts
├── next.config.js
├── package.json
└── README.md

mobile/
├── app/                         # Expo Router
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── register.tsx
│   │
│   ├── (tabs)/
│   │   ├── home.tsx
│   │   ├── cart.tsx
│   │   ├── favorites.tsx
│   │   └── profile.tsx
│   │
│   ├── product/
│   │   └── [id].tsx
│   │
│   ├── checkout/
│   │   ├── address.tsx
│   │   ├── payment.tsx
│   │   └── success.tsx
│   │
│   ├── orders/
│   │   └── index.tsx
│   │
│   └── _layout.tsx
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── product/
│   │   ├── cart/
│   │   └── common/
│
│   ├── features/
│   │   ├── products/
│   │   ├── cart/
│   │   ├── orders/
│   │   └── auth/
│
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── product.service.ts
│   │   └── order.service.ts
│
│   ├── hooks/
│   │   ├── useCart.ts
│   │   └── useAuth.ts
│
│   ├── store/
│   │   ├── cart.store.ts
│   │   └── user.store.ts
│
│   ├── lib/
│   │   ├── clerk.ts
│   │   ├── stripe.ts
│   │   └── query-client.ts
│
│   ├── constants/
│   ├── types/
│   └── utils/
│
├── assets/
│   ├── images/
│   └── icons/
│
├── app.json
├── package.json
└── README.md

# Project Folder Structure

## Root Directory
```
event-driven/
├── backend/
├── frontend/
├── mobile/
└── README.MD
```

---

## 📱 Mobile (React Native - Expo)

```
mobile/
├── android/                          # Android native code
│   ├── app/
│   │   ├── build.gradle
│   │   ├── debug.keystore
│   │   ├── proguard-rules.pro
│   │   └── src/
│   │       ├── debug/
│   │       │   └── AndroidManifest.xml
│   │       ├── debugOptimized/
│   │       │   └── AndroidManifest.xml
│   │       └── main/
│   │           ├── AndroidManifest.xml
│   │           ├── java/
│   │           │   └── com/
│   │           │       └── anonymous/
│   │           │           └── mobile/
│   │           │               ├── MainActivity.kt
│   │           │               └── MainApplication.kt
│   │           └── res/              # Android resources (drawables, mipmaps, values)
│   ├── build.gradle
│   ├── gradle/
│   │   └── wrapper/
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── sentry.properties
│   └── settings.gradle
│
├── app/                              # Expo Router app directory
│   ├── _layout.tsx                   # Root layout
│   ├── (auth)/                       # Auth route group
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── (profile)/                    # Profile route group
│   │   ├── addresses.tsx
│   │   ├── orders.tsx
│   │   ├── privacy-security.tsx
│   │   └── wishlist.tsx
│   ├── (tabs)/                       # Tabs route group
│   │   ├── _layout.tsx
│   │   ├── cart.tsx
│   │   ├── index.tsx
│   │   └── profile.tsx
│   └── product/
│       └── [id].tsx                  # Dynamic route
│
├── assets/
│   └── images/                       # Image assets (18 PNG files)
│       ├── android-icon-background.png
│       ├── android-icon-foreground.png
│       ├── apple.png
│       ├── auth-image.png
│       ├── books.png
│       ├── electronics.png
│       ├── fashion.png
│       ├── favicon.png
│       ├── google.png
│       ├── home.png
│       ├── icon.png
│       ├── splash-icon.png
│       ├── sports.png
│       └── ...
│
├── components/                       # Reusable React components
│   ├── AddressCard.tsx
│   ├── AddressesHeader.tsx
│   ├── AddressFormModal.tsx
│   ├── AddressSelectionModal.tsx
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   ├── LoadingState.tsx
│   ├── OrderSummary.tsx
│   ├── ProductsGrid.tsx
│   ├── RatingModal.tsx
│   └── SafeScreen.tsx
│
├── hooks/                            # Custom React hooks
│   ├── useAddressess.ts
│   ├── useCart.ts
│   ├── useOrders.ts
│   ├── useProduct.ts
│   ├── useProducts.ts
│   ├── useReviews.ts
│   ├── useSocialAuth.ts
│   └── useWishlist.ts
│
├── lib/                              # Utility libraries
│   ├── api.ts                        # API client
│   └── utils.ts                      # Utility functions
│
├── types/                            # TypeScript type definitions
│   └── index.ts
│
├── app.json                          # Expo configuration
├── babel.config.js                   # Babel configuration
├── eslint.config.js                  # ESLint configuration
├── expo-env.d.ts                     # Expo TypeScript declarations
├── global.css                        # Global styles
├── metro.config.js                   # Metro bundler configuration
├── nativewind-env.d.ts               # NativeWind TypeScript declarations
├── package.json
├── package-lock.json
├── README.md
├── tailwind.config.js                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── node_modules/
```

---

## 🖥️ Frontend (React - Vite)

```
frontend/
├── public/                           # Static assets
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── components/                   # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── PageLoader.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── layouts/                      # Layout components
│   │   └── DashboardLayout.jsx
│   │
│   ├── lib/                          # Utility libraries
│   │   ├── api.js                    # API client
│   │   ├── axios.js                  # Axios configuration
│   │   └── utils.js                  # Utility functions
│   │
│   ├── pages/                        # Page components
│   │   ├── CustomersPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── OrdersPage.jsx
│   │   └── ProductsPage.jsx
│   │
│   ├── App.jsx                       # Root component
│   ├── index.css                     # Global styles
│   └── main.jsx                      # Entry point
│
├── eslint.config.js                  # ESLint configuration
├── index.html                        # HTML template
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js                    # Vite configuration
└── node_modules/
```

---

## 🔧 Backend (Node.js - Express)

```
backend/
├── src/                              # Source code
│   ├── config/                       # Configuration files
│   │   ├── clerk.js                  # Clerk authentication config
│   │   ├── cloudinary.js             # Cloudinary image upload config
│   │   ├── db.js                     # Database configuration
│   │   ├── env.js                    # Environment variables
│   │   ├── inngest.js                # Inngest event processing config
│   │   ├── sentry.js                 # Sentry error tracking config
│   │   └── stripe.js                 # Stripe payment config
│   │
│   ├── controllers/                  # Route controllers (business logic)
│   │   ├── admin.controller.js
│   │   ├── cart.controller.js
│   │   ├── order.controller.js
│   │   ├── payment.controller.js
│   │   ├── product.controller.js
│   │   ├── review.controller.js
│   │   └── user.controller.js
│   │
│   ├── middleware/                   # Express middleware
│   │   ├── auth.middleware.js        # Authentication middleware
│   │   └── multer.middleware.js      # File upload middleware
│   │
│   ├── models/                       # Database models (Mongoose)
│   │   ├── cart.model.js
│   │   ├── order.model.js
│   │   ├── product.model.js
│   │   ├── review.model.js
│   │   └── user.model.js
│   │
│   ├── routes/                       # API routes
│   │   ├── admin.route.js
│   │   ├── cart.route.js
│   │   ├── order.route.js
│   │   ├── payment.route.js
│   │   ├── product.route.js
│   │   ├── review.route.js
│   │   └── user.route.js
│   │
│   ├── seeds/                        # Database seed scripts
│   │   └── index.js
│   │
│   └── server.js                     # Application entry point
│
├── dist/                             # Compiled/transpiled JavaScript (build output)
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeds/
│   └── server.js
│
├── package.json
├── package-lock.json
├── Readme.md
├── tsconfig.json                     # TypeScript configuration
└── node_modules/
```

---

## 📊 Summary

### Mobile
- **Framework**: React Native with Expo Router
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS)
- **Architecture**: File-based routing with route groups

### Frontend
- **Framework**: React with Vite
- **Language**: JavaScript (JSX)
- **Purpose**: Admin dashboard
- **Features**: Customers, Orders, Products management

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Language**: JavaScript (with TypeScript config)
- **Architecture**: MVC pattern (Models, Controllers, Routes)
- **Services**: Clerk (Auth), Stripe (Payments), Cloudinary (Images), Inngest (Events), Sentry (Monitoring)

