# Dowar Tech — Setup Instructions

## Prerequisites

- **Node.js** v16 or higher
- **npm** v8 or higher
- **MongoDB** — local installation or [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier)

---

## Backend Setup

### 1. Navigate to backend directory

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dowar-tech
JWT_SECRET=your_super_secret_jwt_key_at_least_32_chars_long
NODE_ENV=development
```

> **Using MongoDB Atlas?** Replace `MONGODB_URI` with your Atlas connection string:
> `MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/dowar-tech`

### 4. Seed the database

This populates the database with 15 pre-configured gaming PCs:

```bash
npm run seed
```

### 5. Start the backend server

```bash
npm run dev      # Development mode with auto-reload
# or
npm start        # Production mode
```

The API will be available at `http://localhost:5000`.

### Verify it's running

```bash
curl http://localhost:5000/api/health
# → {"status":"OK","message":"Dowar Tech API is running"}
```

---

## Frontend Setup

### 1. Navigate to frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start the React development server

```bash
npm start
```

The app will open at `http://localhost:3000`.

---

## API Endpoints Reference

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/auth/me` | Yes | Get current user |
| POST | `/api/auth/logout` | Yes | Logout |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | No | Get all products (with filters) |
| GET | `/api/products/:id` | No | Get product by ID |

**Query Parameters for GET /api/products:**
- `search` — text search
- `category` — Budget, Mid-Range, High-End, Ultra
- `gpu` — GPU filter (comma-separated)
- `cpu` — CPU filter
- `ram` — RAM filter
- `minPrice`, `maxPrice` — price range
- `sort` — newest, price_asc, price_desc, rating
- `page`, `limit` — pagination

### Cart (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart/add` | Add item to cart |
| PUT | `/api/cart/:itemId` | Update item quantity |
| DELETE | `/api/cart/:itemId` | Remove item |
| DELETE | `/api/cart/clear` | Clear cart |

### Orders (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create new order |
| GET | `/api/orders` | Get user's orders |
| GET | `/api/orders/:id` | Get order by ID |

### Reviews
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/reviews/:productId` | No | Get reviews for product |
| POST | `/api/reviews` | Yes | Create review |
| PUT | `/api/reviews/:id` | Yes | Update review |
| DELETE | `/api/reviews/:id` | Yes | Delete review |

### Users (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get profile |
| PUT | `/api/users/profile` | Update profile |

---

## Troubleshooting

### MongoDB connection failed
- Ensure MongoDB service is running: `sudo systemctl start mongod`
- Check the `MONGODB_URI` in your `.env` file
- For Atlas, whitelist your IP address in Network Access

### Port already in use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
# Or change PORT in .env
```

### Frontend can't reach backend
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Ensure CORS allows `http://localhost:3000` (already configured)

### Products not showing
- Run `npm run seed` from the `backend` directory
- Verify the seed completed: check MongoDB for the `products` collection

---

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Use a process manager: `pm2 start server.js --name dowar-tech-api`
3. Set up a reverse proxy (Nginx/Caddy) to expose port 80/443

### Frontend
```bash
cd frontend
npm run build
# Deploy the `build/` folder to a static host (Vercel, Netlify, S3, etc.)
```

Remember to set `REACT_APP_API_URL` to your production API URL before building.
