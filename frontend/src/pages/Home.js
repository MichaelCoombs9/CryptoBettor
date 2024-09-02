import React from 'react';
import { Link } from 'react-router-dom';
import cryptoBettorLogo from '../images/cryptoBettorLogo.png';  // Adjust the path based on the file structure

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <img
          src={cryptoBettorLogo}  
          alt="CryptoBettor Logo"
          className="w-48 h-48 mb-8 mx-auto"
        />
        <h1 className="text-5xl font-bold mb-4">CryptoBettor</h1>
        <p className="text-xl mb-8">The Future of Fantasy Football Betting</p>
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

