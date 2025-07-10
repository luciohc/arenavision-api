import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UpcomingFixtures() {
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await axios.get('http://localhost:3001/fixtures', {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
          }
        });

        setFixtures(response.data.response || []);
      } catch (error) {
        console.error('Erro ao buscar fixtures:', error);
      }
    };

    fetchFixtures();
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">📅 Próximos Jogos</h1>

      {fixtures.length === 0 ? (
        <p className="text-gray-300">Nenhum jogo encontrado.</p>
      ) : (
        <div className="space-y-4">
          {fixtures.map((match) => (
            <div
              key={match.fixture.id}
              className="bg-gray-800 text-white p-3 rounded shadow flex items-center justify-between hover:bg-gray-700"
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-400">{formatDateTime(match.fixture.date)}</span>

                <img src={match.teams.home.logo} alt={match.teams.home.name} className="w-5 h-5" />
                <span>{match.teams.home.name}</span>

                <span className="text-gray-400">vs</span>

                <span>{match.teams.away.name}</span>
                <img src={match.teams.away.logo} alt={match.teams.away.name} className="w-5 h-5" />
              </div>

              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                {match.fixture.venue?.name || 'Local indefinido'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingFixtures;
