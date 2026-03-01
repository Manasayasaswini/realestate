require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const landRoutes = require('./routes/lands');
const plotRoutes = require('./routes/plots');
const plot3dRoutes = require('./routes/plot3d');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/lands', landRoutes);
app.use('/api', plotRoutes);
app.use('/api', plot3dRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
