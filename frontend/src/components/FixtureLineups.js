// src/components/FixtureLineups.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FixtureLineups({ fixtureId }) {
  const [lineups, setLineups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLineups = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/fixture/${fixtureId}/lineups`);
        setLineups(response.data.lineups);
      } catch (error) {
        console.error('Erro ao buscar escalações:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLineups();
  }, [fixtureId]);

  if (loading) return <p className="text-gray-300">Carregando escalações...</p>;
  if (!lineups.length) return <p className="text-gray-300">Sem escalações disponíveis.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">📋 Escalações</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {lineups.map((team, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-blue-300">{team.team}</h3>
            <p className="text-gray-400">Técnico: {team.coach}</p>
            <p className="text-gray-400 mb-2">Formação: {team.formation}</p>

            <div className="mb-3">
              <h4 className="font-semibold text-white">🔰 Titulares:</h4>
              <ul className="list-disc list-inside text-gray-200">
                {team.startingXI.map((player, i) => (
                  <li key={i}>
                    #{player.number} {player.name} – {player.position}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white">🧤 Reservas:</h4>
              <ul className="list-disc list-inside text-gray-400">
                {team.substitutes.map((player, i) => (
                  <li key={i}>
                    #{player.number} {player.name} – {player.position}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
    
export default FixtureLineups;
