# Mobile Application

The cross-platform mobile application for the E-Commerce platform, built with **React Native** and **Expo**.

## 🚀 Tech Stack

- **Framework:** [Expo](https://expo.dev/) (React Native)
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **Styling:** [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [TanStack Query](https://tanstack.com/query/latest)
- **Authentication:** [Clerk](https://clerk.com/)
- **Payments:** [Stripe](https://stripe.com/)
- **Monitoring:** [Sentry](https://sentry.io/)

## � Project Structure

```text
mobile/
├── app/                  # Application screens & routes (file-based)
│   ├── (auth)/           # Authentication routes (Login, Register)
│   ├── (tabs)/           # Main tab navigation (Home, Cart, Profile)
│   ├── product/          # Product details
│   └── _layout.tsx       # Root layout configuration
├── assets/               # Images and icons
├── components/           # Reusable UI components
├── hooks/                # Custom hooks (useCart, useAuth, etc.)
├── lib/                  # Service configurations (Stripe, Clerk, API)
└── package.json
```

## �️ Getting Started

### Prerequisites

- Node.js >= 18
- Expo Go app on your physical device OR Android Studio / Xcode for emulators

### Installation

1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the mobile directory with the following variables:
   
   ```env
   # Clerk Authentication - Get from https://dashboard.clerk.com
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
   
   # Stripe Payments - Get from https://dashboard.stripe.com/apikeys
   EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   
   # Backend API URL
   # For physical devices, replace localhost with your computer's IP address
   # Example: EXPO_PUBLIC_API_URL=http://192.168.1.100:5000/api
   EXPO_PUBLIC_API_URL=http://localhost:5000/api
   
   # Sentry Error Tracking (Optional)
   EXPO_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
   ```
   
   **Important:** 
   - For physical device testing, replace `localhost` in `EXPO_PUBLIC_API_URL` with your computer's local IP address
   - Make sure your backend server is running on port 5000 (or update the URL accordingly)
   - The backend server must have CORS enabled for the mobile app's origin

### Running the App

Start the Expo development server:

```bash
npx expo start
```

- **Scan the QR code** with the Expo Go app (Android) or Camera app (iOS).
- Press `a` to open in Android Emulator.
- Press `i` to open in iOS Simulator.
- Press `w` to open in Web Browser.

## 📱 Features

- **Landing Page:** Beautiful welcome screen with app features and call-to-action
- **Authentication:** Social login (Google, Apple) via Clerk.
- **Product Browsing:** Home screen feed with category filtering and search.
- **Product Details:** Full product information with image gallery and reviews.
- **Cart & Checkout:** Full shopping cart with quantity management and Stripe payment integration.
- **User Profile:** Manage orders, addresses, and wishlist.
- **Real-time Updates:** TanStack Query for efficient data fetching and caching.
