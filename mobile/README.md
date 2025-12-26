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
   Create a `.env` file with your Clerk and Stripe keys (see `.env.example` if available).

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

- **Authentication:** Social login (Google, Apple) via Clerk.
- **Product Browsing:** Home screen feed and product search.
- **Cart & Checkout:** Full shopping cart with Stripe payment integration.
- **User Profile:** Manage orders, addresses, and wishlist.
