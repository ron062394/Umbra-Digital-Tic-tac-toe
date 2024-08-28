const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Get all games
router.get('/games', gameController.getAllGames);

// Get a single game by ID
router.get('/games/:id', gameController.getGameById);

// Create a new game
router.post('/games', gameController.createNewGame);

// Update a game (e.g., add a round or end the session)
router.put('/games/:id', gameController.updateGame);

module.exports = router;
