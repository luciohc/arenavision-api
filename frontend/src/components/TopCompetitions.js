import React from 'react';
import { Link } from 'react-router-dom';

const competitions = [
  { name: 'Brasileirão Betano', icon: '🇧🇷' },
  { name: 'FIFA Club World Cup', icon: '🏆' },
  { name: 'UEFA Champions League', icon: '⚽' },
  { name: 'UEFA Europa League', icon: '🥇' },
  { name: 'Premier League', icon: '🏴' },
];

function TopCompetitions() {
  return (
    <div className="bg-gray-800 p-4 rounded shadow text-white mb-4">
      <h2 className="text-lg font-semibold mb-2">Top Competitions</h2>
      <ul>
        {competitions.map((comp, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-1 hover:bg-gray-700 px-2 rounded"
          >
            <Link
              to={`/competition/${encodeURIComponent(comp.name)}`}
              className="flex items-center space-x-2 hover:underline"
            >
              <span>{comp.icon}</span>
              <span>{comp.name}</span>
            </Link>
            <span>⭐</span>
          </li>
        ))}
      </ul>
      <button className="mt-2 text-sm text-blue-400 hover:underline">Show more</button>
    </div>
  );
}

export default TopCompetitions;
