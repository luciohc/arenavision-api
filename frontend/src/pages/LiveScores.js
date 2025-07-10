import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LiveScores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchLiveScores = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/external/livescores', {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
          }
        });

        setScores(response.data.response || []);
      } catch (error) {
        console.error('Erro ao buscar Live Scores:', error);
      }
    };

    fetchLiveScores();
  }, []);

  // Função para definir o status com cor e ícone
  const getStatusIcon = (status) => {
    if (status.includes('Live')) return '🟢';
    if (status.includes('HT') || status.includes('Half')) return '⏸️';
    if (status.includes('FT') || status.includes('Finished')) return '🏁';
    return '⚽';
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">🟢 Jogos Ao Vivo</h1>

      {scores.length === 0 ? (
        <p className="text-gray-300">Nenhum jogo ao vivo no momento.</p>
      ) : (
        <div className="space-y-4">
          {scores.map((match) => (
            <div
              key={match.fixture.id}
              className="bg-gray-800 text-white p-3 rounded shadow flex items-center justify-between hover:bg-gray-700"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getStatusIcon(match.fixture.status.long)}</span>
                <img src={match.teams.home.logo} alt={match.teams.home.name} className="w-5 h-5" />
                <span>{match.teams.home.name}</span>
                <span className="font-bold">{match.goals.home}</span>
                <span>-</span>
                <span className="font-bold">{match.goals.away}</span>
                <span>{match.teams.away.name}</span>
                <img src={match.teams.away.logo} alt={match.teams.away.name} className="w-5 h-5" />
              </div>

              <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                {match.fixture.status.long}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LiveScores;
