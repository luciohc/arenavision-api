import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FixtureStats({ fixtureId }) {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/fixture/${fixtureId}/stats`, {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
          }
        });
        console.log('API ENVIADA FRONTEND', process.env.REACT_APP_API_KEY);

        setStats(response.data.statistics || []);
      } catch (err) {
        console.error('Erro ao buscar estatísticas:', err);
        setError('Erro ao carregar estatísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [fixtureId]);

  if (loading) return <p className="text-gray-300">Carregando estatísticas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-800 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-white">📊 Estatísticas do Jogo</h2>
      <div className="grid grid-cols-2 gap-8 text-white">
        {stats.map((teamStats, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 text-yellow-400">{teamStats.team.name}</h3>
            <ul className="space-y-1">
              {teamStats.statistics.map((item, idx) => (
                <li key={idx} className="flex justify-between border-b border-gray-600 py-1">
                  <span>{item.type}</span>
                  <span>{item.value ?? '-'}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FixtureStats;
