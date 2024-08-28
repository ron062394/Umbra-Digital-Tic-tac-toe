// src/components/HomePage.js

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await axios.get('umbra-digital-tic-tac-toe-y166.vercel.app/api/games', {
          timeout: 10000, // 10 seconds timeout
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
        setGames(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching games:', error);
        if (error.code === 'ECONNABORTED') {
          setError('Request timed out. Please check your internet connection and try again.');
        } else if (error.response && error.response.status === 504) {
          setError('Server is not responding. Please try again later.');
        } else {
          setError('Failed to fetch games. Please try again later.');
        }
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [games]);

  return (
    <div className="relative min-h-screen overflow-hidden p-4">
      <div className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">
        <h1 className="text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Tic-Tac-Toe
        </h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 max-w-xl mx-auto border border-gray-200">
          <h2 className="text-2xl font-semibold p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">Game History</h2>
          <div ref={scrollRef} className="max-h-80 overflow-y-auto">
            {loading ? (
              <p className="text-gray-500 p-4">Loading games...</p>
            ) : error ? (
              <p className="text-red-500 p-4">{error}</p>
            ) : games.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {games.map(game => (
                  <li key={game._id} className="p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        <span className="text-purple-600">{game.player1}</span> vs <span className="text-pink-600">{game.player2}</span>
                      </span>
                      <span className="text-sm text-gray-600">
                        Score: <span className="text-purple-600 font-semibold">{game.score.player1Wins}</span> : <span className="text-pink-600 font-semibold">{game.score.player2Wins}</span> (Draws: {game.score.draws})
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 p-4">No games available.</p>
            )}
          </div>
        </div>
        <div className="text-center">
          <Link to="/new-game" className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out animate-pulse">
            <span className="mr-2">🎮</span>
            Start New Game
            <span className="ml-2">🚀</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
