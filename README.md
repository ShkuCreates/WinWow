# WinWow - Premium Luxury Watch E-commerce Platform

A full-stack e-commerce platform for luxury watches with pre-booking capabilities, admin dashboard, and elegant glassmorphism UI.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express, TypeScript, Mongoose
- **Database**: MongoDB
- **Payment**: Stripe (integration ready)
- **Auth**: Google OAuth (integration ready)

## Project Structure

```
winwow/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (pages)
│   │   ├── components/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── server.ts
│   │   └── seed.ts
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your credentials (MongoDB URI, JWT secret, etc.)

4. Seed the database with mock products:
   ```bash
   npm run seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

Backend will be running at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

Frontend will be running at `http://localhost:3000`

## Features

- **Home Page**: Hero section, featured products, animated counters
- **Products Page**: Filterable product grid, search functionality
- **Product Details**: Detailed specifications, image gallery, pre-booking modal
- **Login Page**: Google OAuth and email/password options
- **User Dashboard**: Pre-bookings, profile, notifications
- **Admin Panel**: Product management, analytics, reviews

## License

MIT
