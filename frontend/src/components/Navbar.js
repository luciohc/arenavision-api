import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow-md">
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:text-gray-300">Live Scores</Link></li>
        <li><Link to="/fixtures" className="hover:text-gray-300">Próximos Jogos</Link></li>
        <li><Link to="/standings" className="hover:text-gray-300">Classificação</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
