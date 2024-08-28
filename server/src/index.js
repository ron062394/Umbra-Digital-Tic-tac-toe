const express = require('express');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

app.use('/api', gameRoutes);

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export for Vercel
module.exports = app;