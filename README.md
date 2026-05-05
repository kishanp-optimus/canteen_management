# ICAS - Intelligent Canteen Automation System

A full-stack web application for managing canteen operations with AI-powered features.

## 🚀 Features

### Student Portal
- **Menu Browsing** - View menu items with categories, prices, and tags
- **Order Placement** - Add items to cart, choose dine-in or takeaway
- **Token System** - Get unique token number with real-time status tracking
- **Queue Prediction** - AI-powered wait time estimation
- **Order History** - View past orders and their status
- **Best Dish Voting** - Vote for favorite dishes from your orders

### Admin Portal
- **Dashboard** - Real-time metrics (orders, revenue, pending, wastage)
- **Live Orders** - Manage order status with one-click updates
- **Menu Management** - Add, edit, enable/disable menu items
- **Demand Forecast** - AI-powered prediction using exponential smoothing
- **Reports** - Analytics and insights

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **CSS** with custom properties (no framework)

### Backend
- **FastAPI** (Python)
- **Pydantic** for data validation
- **Uvicorn** ASGI server

### AI Features
- **Queue Prediction**: `waitTime = pendingOrders × avgPrepTime + buffer`
- **Demand Forecasting**: Exponential Smoothing `F(t+1) = α × D(t) + (1−α) × F(t)` with α=0.35

## 📁 Project Structure

```
canteen_management/
├── frontend/               # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React contexts (Auth, Cart)
│   │   ├── pages/         # Page components
│   │   ├── styles/        # Global CSS
│   │   ├── utils/         # Utility functions & mock data
│   │   └── assets/        # Images and icons
│   ├── package.json
│   └── vite.config.js
│
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── routers/      # API route handlers
│   │   ├── schemas/      # Pydantic models
│   │   └── models/       # Database models (future)
│   ├── main.py
│   └── requirements.txt
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- npm or yarn

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

## 🎨 Design System

### Colors
- **Primary**: `#FF6B35` (Orange)
- **Secondary**: `#2D3436` (Dark Gray)
- **Success**: `#00b894` (Green)
- **Warning**: `#fdcb6e` (Yellow)
- **Danger**: `#d63031` (Red)

### Status Badges
- **Preparing**: Yellow background
- **Ready**: Green background
- **Confirmed**: Blue background
- **Collected**: Gray background

### Tags
- **Chef's Pick**: Yellow
- **High Demand**: Red
- **Popular**: Gray

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/{id}` - Get specific item
- `POST /api/menu` - Create item (admin)
- `PATCH /api/menu/{id}` - Update item (admin)

### Orders
- `GET /api/orders` - Get orders
- `GET /api/orders/live` - Get active orders
- `POST /api/orders` - Create order
- `PATCH /api/orders/{id}/status` - Update status
- `GET /api/orders/queue/info` - Get queue prediction

### Voting
- `GET /api/voting` - Get voting results
- `POST /api/voting/vote` - Cast vote

### Forecast
- `GET /api/forecast` - Get demand forecasts
- `GET /api/forecast/algorithm/explain` - Explain AI algorithm

## 🔑 Test Credentials

### Student Login
- Email: `student@dgi.edu.in`
- Password: any password

### Admin Login
- Email: `admin@dgi.edu.in`
- Password: any password

## 📸 Screenshots

(Add screenshots here)

## 🙏 Credits

- **Institution**: Dronacharya Group of Institutions
- **Project**: ICAS - Intelligent Canteen Automation System

## 📄 License

This project is for educational purposes.
