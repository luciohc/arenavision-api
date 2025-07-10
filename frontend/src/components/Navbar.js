import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow-md">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-gray-300">
            ⚽ Live Scores
          </Link>
        </li>
        <li>
          <Link to="/fixtures" className="hover:text-gray-300">
            📅 Próximos Jogos
          </Link>
        </li>
        <li>
          <Link to="/standings" className="hover:text-gray-300">
            🏆 Classificação
          </Link>
        </li>
        <li>
          <Link to="/odds" className="hover:text-blue-400">
            💸 Odds
          </Link>
        </li>
        <li>
          <Link to="/stats" className="hover:text-yellow-300">
            📊 Estatísticas
          </Link>
        </li>
        <li>
          <Link to="/fixture/198772/lineups" className="hover:text-green-300">🧾 Escalações</Link>
        </li>
        <li><Link to="/players" className="hover:text-purple-400">🏅 Jogadores</Link></li>
        <li>
          <Link to="/fixture/198772/events" className="hover:text-yellow-400">📺 Eventos Por Jogo</Link>
        </li>
        <li>
          <Link to="/events" className="hover:text-yellow-300">⚡ Todos os Eventos</Link>
        </li>
        <li>
          <Link to="/team-fixtures" className="hover:text-yellow-400">🔍 Por Time</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
