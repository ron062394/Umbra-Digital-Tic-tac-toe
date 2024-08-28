// src/components/Game.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Confetti from 'react-confetti';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameData, setGameData] = useState(null);
  const [winner, setWinner] = useState(null);
  const [roundEnded, setRoundEnded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(`https://umbra-digital-tic-tac-toe-backend.onrender.com/api/games/${id}`);
        setGameData(response.data);
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    fetchGameData();
  }, [id]);

  const handleClick = (index) => {
    if (roundEnded) return;
    const boardCopy = [...board];
    if (boardCopy[index] || winner) return;

    boardCopy[index] = isXNext ? 'X' : 'O';
    setBoard(boardCopy);
    setIsXNext(!isXNext);

    const roundWinner = calculateWinner(boardCopy);
    if (roundWinner || boardCopy.every(square => square !== null)) {
      setWinner(roundWinner);
      setRoundEnded(true);
      setShowModal(true);
      if (roundWinner) {
        setShowConfetti(true);
      }
    }
  };

  const updateGameData = async (action) => {
    const winner = calculateWinner(board);
    let winnerString = '';
    if (winner === 'X') winnerString = 'player1';
    else if (winner === 'O') winnerString = 'player2';
    else winnerString = 'draw';

    try {
      const response = await axios.put(`https://umbra-digital-tic-tac-toe-backend.onrender.com/api/games/${id}`, {
        winner: winnerString,
        board: [
          board.slice(0, 3),
          board.slice(3, 6),
          board.slice(6, 9)
        ]
      });

      setGameData(prevData => ({
        ...prevData,
        score: response.data.updatedScore,
        rounds: (prevData.rounds || []).concat(response.data.newRound)
      }));

      if (action === 'continue') {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setRoundEnded(false);
        setShowModal(false);
        setShowConfetti(false);
      } else if (action === 'stop') {
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating game data:', error);
    }
  };

  const renderSquare = (index) => (
    <button 
      className="w-24 h-24 bg-white border border-purple-300 text-5xl font-bold text-purple-700 hover:bg-purple-100 transition-colors duration-200 ease-in-out rounded-lg shadow-md"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  if (!gameData) {
    return <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-3xl font-bold text-purple-800">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-8 px-4 relative">
      {showConfetti && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
        </div>
      )}
      <div className="container mx-auto max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden">
        <h1 className="text-3xl font-bold text-center text-white py-6 bg-gradient-to-r from-purple-600 to-pink-600">Tic-Tac-Toe</h1>
        <div className="p-6">
          <div className="bg-purple-50 rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-1">Player 1 (X): <span className="text-purple-600">{gameData.player1}</span></h2>
            <h2 className="text-xl font-semibold text-pink-700 mb-1">Player 2 (O): <span className="text-pink-600">{gameData.player2}</span></h2>
            <h3 className="text-lg text-gray-700">
              Score: <span className="text-purple-600 font-semibold">{gameData.score.player1Wins}</span> - <span className="text-pink-600 font-semibold">{gameData.score.player2Wins}</span> (Draws: {gameData.score.draws})
            </h3>
          </div>
          <div className="text-center mb-6">
            {winner ? (
              <h2 className="text-2xl font-bold text-gradient bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Winner: {winner === 'X' ? `${gameData.player1} (X)` : `${gameData.player2} (O)`}
              </h2>
            ) : (
              <h2 className="text-2xl font-bold text-gradient bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Next Player: {isXNext ? `${gameData.player1} (X)` : `${gameData.player2} (O)`}
              </h2>
            )}
          </div>
          <div className="board flex flex-col items-center mb-6">
            <div className="board-row flex gap-2 mb-2">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row flex gap-2 mb-2">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row flex gap-2">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
          {roundEnded && (
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => updateGameData('continue')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-lg hover:from-purple-700 hover:to-pink-700 transition-colors duration-300 ease-in-out"
              >
                Continue
              </button>
              <button 
                onClick={() => updateGameData('stop')}
                className="px-6 py-3 bg-gray-300 text-gray-700 font-bold rounded-full shadow-lg hover:bg-gray-400 transition-colors duration-300 ease-in-out"
              >
                Stop 🚪
              </button>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-4 text-gradient bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {winner ? `Winner: ${winner === 'X' ? `${gameData.player1} (X)` : `${gameData.player2} (O)`}` : "It's a Draw!"}
            </h2>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => updateGameData('continue')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-lg hover:from-purple-700 hover:to-pink-700 transition-colors duration-300 ease-in-out"
              >
                Play Again
              </button>
              <button 
                onClick={() => updateGameData('stop')}
                className="px-6 py-3 bg-gray-300 text-gray-700 font-bold rounded-full shadow-lg hover:bg-gray-400 transition-colors duration-300 ease-in-out"
              >
                End Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
