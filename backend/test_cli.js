#!/usr/bin/env node

const { Command } = require('commander');
const axios = require('axios');
require('dotenv').config();

const program = new Command();
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000/api';
let authToken = null;

// Helper function for authenticated requests
const authAxios = () => {
  if (!authToken) {
    console.error('Error: Not logged in. Please run the login command first.');
    process.exit(1);
  }
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

program
  .name('realestate-cli')
  .description('CLI client for the Real Estate Backend API')
  .version('1.0.0');

program.command('health')
  .description('Check the health of the API')
  .action(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/health`);
      console.log('API Health:', response.data);
    } catch (error) {
      console.error('Error checking API health:', error.message);
    }
  });

program.command('register')
  .description('Register a new user')
  .option('-n, --name <name>', 'User's name', 'Test User')
  .option('-e, --email <email>', 'User's email', `test${Date.now()}@example.com`)
  .option('-p, --password <password>', 'User's password', 'password123')
  .action(async (options) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name: options.name,
        email: options.email,
        password: options.password,
      });
      console.log('Registration successful:', response.data);
      authToken = response.data.token;
      console.log('Logged in automatically after registration.');
    } catch (error) {
      console.error('Error registering user:', error.response ? error.response.data : error.message);
    }
  });

program.command('login')
  .description('Login an existing user')
  .option('-e, --email <email>', 'User's email', 'test@example.com') // Replace with a default test user email
  .option('-p, --password <password>', 'User's password', 'password123') // Replace with a default test user password
  .action(async (options) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: options.email,
        password: options.password,
      });
      console.log('Login successful:', response.data);
      authToken = response.data.token;
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
  });

program.command('get-lands')
  .description('Get all land listings (requires login)')
  .action(async () => {
    try {
      const response = await authAxios().get('/lands');
      console.log('Land listings:', response.data);
    } catch (error) {
      console.error('Error fetching lands:', error.response ? error.response.data : error.message);
    }
  });

program.command('get-land-by-id <id>')
  .description('Get a land listing by ID (requires login)')
  .action(async (id) => {
    try {
      const response = await authAxios().get(`/lands/${id}`);
      console.log('Land details:', response.data);
    } catch (error) {
      console.error('Error fetching land by ID:', error.response ? error.response.data : error.message);
    }
  });

program.command('get-plots-by-land <landId>')
  .description('Get all plots for a specific land ID (requires login)')
  .action(async (landId) => {
    try {
      const response = await authAxios().get(`/lands/${landId}/plots`);
      console.log('Plots for land:', response.data);
    } catch (error) {
      console.error('Error fetching plots by land ID:', error.response ? error.response.data : error.message);
    }
  });

program.command('get-plot-by-id <id>')
  .description('Get a plot by ID (requires login)')
  .action(async (id) => {
    try {
      const response = await authAxios().get(`/plots/${id}`);
      console.log('Plot details:', response.data);
    } catch (error) {
      console.error('Error fetching plot by ID:', error.response ? error.response.data : error.message);
    }
  });

program.command('get-plot-3d <plotId>')
  .description('Get 3D data for a specific plot ID (requires login)')
  .action(async (plotId) => {
    try {
      const response = await authAxios().get(`/plots/${plotId}/3d`);
      console.log('Plot 3D data:', response.data);
    } catch (error) {
      console.error('Error fetching plot 3D data:', error.response ? error.response.data : error.message);
    }
  });

program.parse(process.argv);

// Instructions for running the CLI:
// 1. Make sure you have Node.js installed.
// 2. Navigate to the backend directory: cd /home/manasa/real_estate/backend
// 3. Install dependencies: npm install axios commander dotenv
// 4. Create a .env file with BASE_URL (e.g., BASE_URL=http://localhost:5000/api)
// 5. Run commands, e.g.:
//    node test_cli.js health
//    node test_cli.js register --name "CLI User" --email "cli@example.com" --password "clitest"
//    node test_cli.js login --email "cli@example.com" --password "clitest"
//    node test_cli.js get-lands
//    node test_cli.js get-land-by-id <LAND_ID>
//    node test_cli.js get-plots-by-land <LAND_ID>
//    node test_cli.js get-plot-by-id <PLOT_ID>
//    node test_cli.js get-plot-3d <PLOT_ID>
