// src/components/NewGameSession.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewGameSession = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const navigate = useNavigate();

  const handleStartGame = async () => {
    try {
      const response = await axios.post('https://umbra-digital-tic-tac-toe-y166.vercel.app/api/games', {
        player1,
        player2
      });
      
      const gameId = response.data._id;
      navigate(`/game/${gameId}`);
    } catch (error) {
      console.error('Error starting new game:', error);
      // TODO: Implement error handling (e.g., show error message to user)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-white py-6 bg-gradient-to-r from-purple-600 to-pink-600">
          New Game Session
        </h1>
        <form onSubmit={(e) => e.preventDefault()} className="px-8 pt-6 pb-8">
          <div className="mb-6">
            <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="player1">
              Player 1:
            </label>
            <input
              className="shadow appearance-none border border-purple-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-300"
              id="player1"
              type="text"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              required
              placeholder="Enter Player 1 name"
            />
          </div>
          <div className="mb-8">
            <label className="block text-pink-700 text-sm font-bold mb-2" htmlFor="player2">
              Player 2:
            </label>
            <input
              className="shadow appearance-none border border-pink-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500 transition duration-300"
              id="player2"
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              required
              placeholder="Enter Player 2 name"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out animate-pulse"
              type="submit"
              onClick={handleStartGame}
            >
              <span className="mr-2">🎮</span>
              Start Game
              <span className="ml-2">🚀</span>
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default NewGameSession;
