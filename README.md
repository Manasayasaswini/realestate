# 🏡 Interactive Real Estate Visualization Platform

A modern real estate web application where users can:

1. View lands (fields)
2. Click a land to see subdivided plots
3. Click a plot to view its **3D visualization**

This is a **full-stack project** built using **React + Node.js + Maps + Three.js + Entire.io workflow**.

---

# 🚀 Features

✅ User Authentication (JWT)  
✅ View all Lands (Fields)  
✅ Click Land → View subdivided plots  
✅ Click Plot → View 3D model  
✅ Map-based visualization using polygons  
✅ Plot availability status (Available / Sold)  
✅ 3D preview using Three.js  

---

# 🧠 System Flow

Login → Lands List → Click Land → View Plots → Click Plot → 3D Visualization

---

# 🏗️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Leaflet.js (Map rendering)
- React Three Fiber / Three.js (3D rendering)

## Backend
- Node.js
- Express.js

## Database
- MongoDB (Mongoose)

## 3D Assets
- `.glb` / `.gltf` models (Blender / Sketchfab)

---

# 📁 Project Structure

```
realestate-app/
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── LandsPage.jsx
│ │ │ ├── PlotsPage.jsx
│ │ │ └── Plot3DPage.jsx
│ │ │
│ │ ├── components/
│ │ │ ├── MapView.jsx
│ │ │ ├── PlotCard.jsx
│ │ │ └── ThreeViewer.jsx
│ │
│ └── package.json
│
├── backend/
│ ├── models/
│ │ ├── Land.js
│ │ ├── Plot.js
│ │ └── Plot3D.js
│ │
│ ├── routes/
│ │ ├── lands.js
│ │ ├── plots.js
│ │ └── plot3d.js
│ │
│ ├── controllers/
│ └── server.js
│
└── README.md
```

---

# 🧾 Database Schema

## 🟢 Land

```json
{
  "name": "String",
  "location": "String",
  "total_area": "Number",
  "coordinates": [ [lat, lng], ... ]
}
```

## 🟡 Plot

```json
{
  "land_id": "ObjectId",
  "plot_number": "String",
  "area": "Number",
  "coordinates": [ [lat, lng], ... ],
  "status": "available" | "sold"
}
```

## 🔵 Plot3D

```json
{
  "plot_id": "ObjectId",
  "model_url": "String",
  "dimensions": {
    "width": "Number",
    "length": "Number",
    "height": "Number"
  }
}
```

---

# 🔌 API Endpoints

## Lands

- `GET /api/lands`
- `GET /api/lands/:id`

## Plots

- `GET /api/lands/:landId/plots`
- `GET /api/plots/:id`

## Plot 3D

- `GET /api/plots/:id/3d`

---

# 🗺️ Map Visualization (Leaflet)

Example:

```js
L.polygon(land.coordinates).addTo(map)

L.polygon(plot.coordinates).on('click', () => {
   openPlot(plot.id)
})
```

# 🧊 3D Plot Visualization (Three.js)

Example:

```js
const geometry = new THREE.BoxGeometry(width, height, depth)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
```

3D Model path example:
`/models/plot1.glb`

---

# ⚙️ Installation Guide

1. **Clone Repository**
   ```bash
   git clone <your_repo_url>
   cd realestate-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

   Run backend:
   ```bash
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

# 🌍 Deployment

- **Frontend**: Vercel / Netlify
- **Backend**: Render / Railway
- **Database**: MongoDB Atlas

---

# 🧪 Development Phases

🟢 **Phase 1 (MVP)**
- Authentication
- Lands listing
- Plots listing

🟡 **Phase 2**
- Map visualization
- Polygon drawing

🔵 **Phase 3**
- 3D plot rendering

🔴 **Phase 4 (Advanced)**
- House models
- Virtual walkthrough
- Booking system
- Razorpay integration

---

# 🧰 Entire.io Workflow (IMPORTANT)

This project uses Entire.io to manage commits and generate explanations.

- **Initialize Entire**: `entire init`
- **Create Checkpoint**: `entire checkpoint "initial setup"`
- **Explain Commit**: `entire explain --commit <commit_id>`
- **Explain Checkpoint**: `entire explain --checkpoint <checkpoint_id>`

**Recommended Workflow**:
1. `git add .`
2. `git commit -m "Added plots API"`
3. `entire checkpoint "plots api completed"`

---

# 🧠 Future Enhancements

- Compass direction (North-facing plots)
- Area measurement tool
- Sunlight & shadow simulation
- House construction preview
- VR walkthrough of property

---

# 👨‍💻 Author

**Sandeep Bangaru**
Full Stack Developer | Real Estate Tech Builder 🚀

---

# ⭐ Final Vision

Build a next-generation real estate platform where users can explore land, plots, and property in interactive 3D before buying.

---

# 📢 Contribution

Pull requests are welcome. For major changes, open an issue first.

---

# 📄 License

MIT License
