const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Middleware
// CORS for querying different domains
app.use(cors({ origin: ['https://umbra-digital-tic-tac-toe.vercel.app/', 'http://localhost:3000'] }));


app.use(express.json());
app.get('/', (req, res) => {
res.json('Hello, welcome to the backend!')
})

// Routes
app.use('/api', require('./src/routes/gameRoutes'));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});