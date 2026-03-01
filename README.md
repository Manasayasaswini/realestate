# Interactive Real Estate Visualization Platform

A full-stack project where users can:
1. Login/Register
2. View lands (fields)
3. Click a land to view subdivided plots
4. Click a plot to view a 3D visualization

## Implemented Stack

### Frontend
- React + Vite
- React Router
- Leaflet (with React Leaflet) for map polygon rendering
- React Three Fiber + Drei + Three.js for 3D preview

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication

## Current Project Structure

```text
real_estate/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── landController.js
│   │   ├── plotController.js
│   │   └── plot3dController.js
│   ├── middleware/authMiddleware.js
│   ├── models/
│   │   ├── land.js
│   │   ├── plot.js
│   │   ├── plot3d.js
│   │   └── user.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── lands.js
│   │   ├── plots.js
│   │   └── plot3d.js
│   ├── scripts/seed.js
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   ├── index.html
│   ├── vite.config.js
│   └── .env.example
└── README.md
```

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Lands
- `GET /api/lands`
- `GET /api/lands/:id`

### Plots
- `GET /api/lands/:landId/plots`
- `GET /api/plots/:id`

### Plot 3D
- `GET /api/plots/:id/3d`

## Environment Setup

### Backend `.env`
Create `backend/.env` from `backend/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/real_estate
JWT_SECRET=replace_with_secure_secret
```

### Frontend `.env`
Create `frontend/.env` from `frontend/.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Run Locally

### 1) Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2) Seed sample data

```bash
cd backend
npm run seed
```

### 3) Start backend

```bash
cd backend
npm run dev
```

### 4) Start frontend

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`.

## User Flow

Login/Register -> Lands list -> Click land polygon -> Plot list -> Click "View 3D"

## Notes

- API routes except auth are JWT-protected.
- Seed script inserts one sample land, two plots, and 3D dimensions.
- 3D page currently renders a dimension-based box model for each plot.
