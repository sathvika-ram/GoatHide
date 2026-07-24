# GOATHIDES - Luxury Leather E-Commerce Platform

> Crafted for Life. Designed for Legacy.

GOATHIDES is a complete, production-ready full-stack luxury leather e-commerce platform. It features an elegant, minimalist, and responsive user experience inspired by premium brands like Carl Friedrik and Nappa Dori, paired with a robust Express + Prisma + PostgreSQL backend.

---

## Technical Stack

*   **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Recharts, canvas-confetti.
*   **Backend**: Node.js, Express.js, TypeScript.
*   **ORM / Database**: Prisma Client, PostgreSQL.
*   **Authentication**: JSON Web Tokens (JWT), role-based middleware filters.
*   **Media**: Cloudinary integration with local filesystem fallback.
*   **Payment Integrations**: Stripe, Razorpay, PayPal (supporting Apple/Google Pay and UPI via gateway routing).

---

## Directory Architecture

```text
goathides/
├── docker-compose.yml
├── README.md
├── .env.example
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/
│   │   └── schema.prisma
│   └── src/
│       ├── server.ts
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       └── services/
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── tailwind.config.ts
    └── src/
        ├── app/             # All Next.js pages (Home, Shop, Cart, etc.)
        ├── components/      # UI components (Header, Footer, Chat, Compare)
        ├── context/         # Auth, Cart, Language, Currency contexts
        └── locales/         # 10 translations lists (AR with RTL support)
```

---

## Features

1.  **Mega Menu**: Smooth popover navigations detailing categories.
2.  **Product Comparisons**: Sidebar panel comparing up to 3 leather specifications side-by-side.
3.  **Frequently Bought Together**: Bundle selectors adding multiple matched items to the checkout bag.
4.  **Language Context (i18n)**: Instantly translates between English, French, German, Spanish, Italian, Arabic, Hindi, Telugu, Japanese, and Chinese. Toggles document `dir="rtl"` automatically for Arabic.
5.  **Currency Context**: Dynamic price conversion and formatting for USD, EUR, GBP, INR, JPY, and AED using locale-aware formatting.
6.  **Loyalty Club**: Accumulate reward points from checkout transactions and redeem them for cart discounts.
7.  **Referral System**: Share individual code strings. Referrals earn welcome points, and referrers receive bonus multipliers upon checkout completion.
8.  **Store Locator**: Interactive map layout showing global boutique addresses (London, Tokyo, New York, Florence).
9.  **Admin Console**: Sales graphs, product CRUD tables, and dispatch status updates with tracking number integrations.

---

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher)
*   [Docker](https://www.docker.com/) (optional, for compose setup)
*   PostgreSQL Database instance

### Quick Start with Docker Compose

To compile, link, and launch the database, backend, and frontend containers automatically:

1.  Copy the environment variables template:
    ```bash
    cp .env.example .env
    ```
2.  Boot up the Docker containers:
    ```bash
    docker-compose up --build
    ```
3.  The frontend is accessible at [http://localhost:3000](http://localhost:3000) and the API server at [http://localhost:5000](http://localhost:5000).

---

## Local Development (Manual Setup)

### 1. Database & Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure your local `.env` variables (Database URL, JWT secrets, etc.).
4.  Create database tables and push migrations:
    ```bash
    npx prisma migrate dev --name init
    ```
5.  Seed the database with categories and premium leather products:
    ```bash
    npx prisma db seed
    ```
6.  Start the API server in development mode:
    ```bash
    npm run dev
    ```

### 2. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Next.js development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Resilient Sandbox Fallbacks

If live API keys are not supplied in `.env`, the platform operates in a robust local sandbox simulation:
*   **Stripe / Razorpay / PayPal**: Simulates payments and confirms checkout transactions automatically.
*   **Cloudinary**: Saves image uploads into the server's local public directory (`/public/uploads`) instead of cloud storage.
*   **Database connection**: Next.js client pages use state fallbacks if the Express backend is offline.
