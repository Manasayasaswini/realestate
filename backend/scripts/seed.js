require('dotenv').config();
const connectDB = require('../config/db');

const Land = require('../models/land');
const Plot = require('../models/plot');
const Plot3D = require('../models/plot3d');

const seed = async () => {
  try {
    await connectDB();

    await Plot3D.deleteMany({});
    await Plot.deleteMany({});
    await Land.deleteMany({});

    const [land] = await Land.insertMany([
      {
        name: 'Green Valley Field',
        location: 'Bangalore, India',
        total_area: 24000,
        coordinates: [
          [12.9716, 77.5946],
          [12.9726, 77.5946],
          [12.9726, 77.596],
          [12.9716, 77.596]
        ]
      }
    ]);

    const plots = await Plot.insertMany([
      {
        land_id: land._id,
        plot_number: 'A-101',
        area: 1200,
        status: 'available',
        coordinates: [
          [12.9717, 77.5947],
          [12.972, 77.5947],
          [12.972, 77.5951],
          [12.9717, 77.5951]
        ]
      },
      {
        land_id: land._id,
        plot_number: 'A-102',
        area: 1000,
        status: 'sold',
        coordinates: [
          [12.972, 77.5947],
          [12.9723, 77.5947],
          [12.9723, 77.5951],
          [12.972, 77.5951]
        ]
      }
    ]);

    await Plot3D.insertMany([
      {
        plot_id: plots[0]._id,
        model_url: '',
        dimensions: { width: 12, length: 10, height: 8 }
      },
      {
        plot_id: plots[1]._id,
        model_url: '',
        dimensions: { width: 10, length: 10, height: 7 }
      }
    ]);

    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seed();
