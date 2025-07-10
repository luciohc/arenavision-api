import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Players() {
  const [activeTab, setActiveTab] = useState('topscorers');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const league = 39;
  const season = 2023;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3001/api/players/${activeTab}?league=${league}&season=${season}`, {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
          }
        });
        setPlayers(response.data.response || []);
      } catch (err) {
        setError('Erro ao carregar dados.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🏆 Ranking de Jogadores</h1>

      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'topscorers' ? 'bg-blue-600 text-white' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('topscorers')}
        >
          Artilheiros
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'topassists' ? 'bg-green-600 text-white' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('topassists')}
        >
          Assistências
        </button>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {players.map((item, index) => {
            const player = item.player;
            const team = item.statistics?.[0]?.team;
            const stats = item.statistics?.[0];
            const value = activeTab === 'topscorers' ? stats?.goals?.total : stats?.goals?.assists;

            return (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center space-x-4">
                  <img src={player.photo} alt={player.name} className="w-16 h-16 rounded-full" />
                  <div>
                    <h2 className="text-lg font-semibold">{player.name}</h2>
                    <p className="text-sm text-gray-400">{team?.name}</p>
                    <p className="text-sm text-gray-500">🇺🇳 {player.nationality}</p>
                    <p className="mt-1 font-bold">
                      {activeTab === 'topscorers' ? '⚽ Gols: ' : '🎯 Assistências: '}
                      {value ?? 0}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Players;
