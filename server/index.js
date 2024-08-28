const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Middleware
// CORS for querying different domains
app.use(cors({ origin: ['https://umbra-digital-tic-tac-toe.vercel.app', 'http://localhost:3000', 'https://www.postman.com'] }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  if (req.body) {
    console.log('Request body:');
    console.log(req.body);
  }  
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json('Hello, welcome to the backend!');
});

// Connect to MongoDB before setting up routes
mongoose
  .connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000 // Increased timeout to 30 seconds
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Set up routes after successful connection
    app.use('/api', require('./src/routes/gameRoutes'));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Start the server
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Increase the timeout for the server
server.timeout = 120000; // 120 seconds

// Add error handling for the server
server.on('error', (error) => {
  console.error('Server error:', error);
});