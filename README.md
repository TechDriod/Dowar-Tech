# Dowar Tech — Gaming PC Store

A full-stack e-commerce platform for premium gaming PCs, built with React, Node.js, Express, and MongoDB.

![Gaming PC Store](https://via.placeholder.com/800x400/0a0a0f/b537f2?text=DOWAR+TECH)

## 🎮 Features

- **15+ Gaming PCs** across Budget, Mid-Range, High-End, and Ultra categories
- **Full Authentication** — JWT-based register/login/logout
- **Advanced Filtering** — Filter by GPU, CPU, RAM, price range, and category
- **Shopping Cart** — Persistent local cart with quantity controls
- **Multi-Step Checkout** — Shipping → Delivery method → Order review → Confirmation
- **Order History** — Track past orders with expandable details and status badges
- **Product Reviews** — Star-rated reviews for authenticated users (one per product)
- **User Profile** — Manage account info and saved shipping address
- **Responsive Design** — Mobile-first dark gaming aesthetic with neon accents
- **Database Seeding** — 15 pre-configured gaming PCs ready to go

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Tailwind CSS, Context API |
| Routing | React Router v6 |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Validation | express-validator |
| UI Icons | react-icons |
| Notifications | react-hot-toast |
| HTTP Client | Axios |

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Backend

```bash
cd backend
cp .env.example .env       # Configure your MongoDB URI & JWT secret
npm install
npm run seed               # Seed 15 gaming PCs into MongoDB
npm run dev                # API available at http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env       # Set REACT_APP_API_URL if needed
npm install
npm start                  # App available at http://localhost:3000
```

> See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) for full documentation.

## 📁 Project Structure

```
Dowar-Tech/
├── backend/
│   ├── config/db.js          # MongoDB connection
│   ├── controllers/          # authController, productController, etc.
│   ├── data/products.js      # 15 gaming PC seed data
│   ├── middleware/           # JWT auth, error handler, validation
│   ├── models/               # User, Product, Order, Review, Cart
│   ├── routes/               # Express routes
│   └── server.js             # Entry point
└── frontend/
    └── src/
        ├── components/       # Navbar, Footer, ProductCard, etc.
        ├── context/          # AuthContext, CartContext
        ├── pages/            # Home, Products, Cart, Checkout, etc.
        └── services/         # api.js (Axios), auth.js
```

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Neon Purple | `#b537f2` | Primary accent, buttons, glow |
| Neon Cyan | `#00f5ff` | Secondary accent, highlights |
| Neon Green | `#39ff14` | Success states, Budget category |
| Dark 900 | `#0a0a0f` | Page background |
| Dark 800 | `#12121a` | Card backgrounds |

## 📄 License

This project is licensed under the MIT License.