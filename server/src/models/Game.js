const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
  winner: { type: String, enum: ['player1', 'player2', 'draw'], required: true },
  board: [[String]], // 3x3 grid for Tic-Tac-Toe
}, { timestamps: true });

const gameSchema = new mongoose.Schema({
  player1: { type: String, required: true },
  player2: { type: String, required: true },
  score: {
    player1Wins: { type: Number, default: 0 },
    player2Wins: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
  },
  rounds: [roundSchema], // History of each round
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
