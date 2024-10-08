const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Middleware
// Allow requests from any origin with specific methods and credentials
const corsOptions = {
  origin: '*', // Allow any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
  credentials: true, // Allow cookies and other credentials
};

app.use(cors(corsOptions));


app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  if (req.body) {
    console.log('Request body:');
    console.log(req.body);
  }  
  next();
});
app.get('/', (req, res) => {
  res.json('Hello, welcome to the backend!');
});


// Routes
app.use('/api', require('./src/routes/gameRoutes'));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // 5 second timeout
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Start the server
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Add a timeout to the server
server.timeout = 60000; // 60 seconds