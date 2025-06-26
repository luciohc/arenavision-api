import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Standings() {
  const [table, setTable] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/standings');
        const standingsData = response.data.response[0]?.league?.standings[0];
        setTable(standingsData || []);
      } catch (error) {
        console.error('Erro ao buscar standings:', error);
      }
    };

    fetchStandings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🏆 Classificação</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-white bg-gray-800 rounded-lg shadow">
          <thead className="bg-gray-900 text-gray-200">
            <tr>
              <th className="py-2 px-3">Pos</th>
              <th className="py-2 px-3 text-left">Time</th>
              <th className="py-2 px-3">P</th>
              <th className="py-2 px-3">V</th>
              <th className="py-2 px-3">E</th>
              <th className="py-2 px-3">D</th>
              <th className="py-2 px-3">GP</th>
              <th className="py-2 px-3">GC</th>
              <th className="py-2 px-3">SG</th>
              <th className="py-2 px-3">Pts</th>
            </tr>
          </thead>
          <tbody>
            {table.map((team) => (
              <tr key={team.team.id} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="py-2 px-3 text-center">{team.rank}</td>
                <td className="py-2 px-3 flex items-center space-x-2">
                  <img src={team.team.logo} alt={team.team.name} className="w-5 h-5" />
                  <span>{team.team.name}</span>
                </td>
                <td className="py-2 px-3 text-center">{team.all.played}</td>
                <td className="py-2 px-3 text-center">{team.all.win}</td>
                <td className="py-2 px-3 text-center">{team.all.draw}</td>
                <td className="py-2 px-3 text-center">{team.all.lose}</td>
                <td className="py-2 px-3 text-center">{team.all.goals.for}</td>
                <td className="py-2 px-3 text-center">{team.all.goals.against}</td>
                <td className="py-2 px-3 text-center">{team.goalsDiff}</td>
                <td className="py-2 px-3 text-center font-bold">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Standings;
