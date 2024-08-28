const Game = require('../models/Game');

// Get all games
const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Get a single game by ID
const getGameById = async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findById(id);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Create a new game
const createNewGame = async (req, res) => {
  const { player1, player2 } = req.body;
  try {
    const newGame = new Game({ player1, player2 });
    await newGame.save();
    res.json(newGame);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Update a game (e.g., update scores or game history)
const updateGame = async (req, res) => {
    const { id } = req.params;
    const { winner, board } = req.body;
  
    try {
      const game = await Game.findById(id);
  
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
  
      // Add new round data
      const newRound = { winner, board };
      game.rounds.push(newRound);
  
      // Update scores based on the winner
      if (winner === 'player1') {
        game.score.player1Wins += 1;
      } else if (winner === 'player2') {
        game.score.player2Wins += 1;
      } else if (winner === 'draw') {
        game.score.draws += 1;
      }
  
      // Save the updated game data
      await game.save();
      
      // Send only the updated data
      res.json({
        newRound,
        updatedScore: game.score,
        totalRounds: game.rounds.length
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  


module.exports = {
  getGameById,
    getAllGames,
    createNewGame,
    updateGame,

};