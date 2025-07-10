import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CompetitionMatches() {
  const { name } = useParams();
  const [matches, setMatches] = useState({ live: [], today: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/competition/${encodeURIComponent(name)}/matches`,
          {
            headers: {
              'x-api-key': process.env.REACT_APP_API_KEY
            }
          }
        );


        setMatches({
          live: response.data.live || [],
          today: response.data.today || [],
        });
      } catch (error) {
        console.error('Erro ao buscar os jogos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [name]);

  if (loading) return <p className="text-white p-4">⏳ Carregando jogos...</p>;

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-zinc-900 min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">
        Jogos da Competição: <span className="text-blue-400">{decodeURIComponent(name)}</span>
      </h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">🟢 Jogos ao Vivo</h2>
        {matches.live.length === 0 ? (
          <p className="text-gray-400">Nenhum jogo ao vivo.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {matches.live.map((match, idx) => (
              <div key={match.fixture?.id || idx} className="bg-zinc-800 p-4 rounded-lg shadow hover:bg-zinc-700 transition">
                <p className="text-lg font-bold text-green-400 mb-1">⏱ Ao Vivo</p>
                <p>
                  <strong>{match.teams?.home?.name}</strong> {match.goals?.home} - {match.goals?.away} <strong>{match.teams?.away?.name}</strong>
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">📅 Jogos do Dia</h2>
        {matches.today.length === 0 ? (
          <p className="text-gray-400">Nenhum jogo agendado para hoje.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {matches.today.map((match, idx) => (
              <div key={match.fixture?.id || idx} className="bg-zinc-800 p-4 rounded-lg shadow hover:bg-zinc-700 transition">
                <p className="text-sm text-gray-400 mb-1">{formatTime(match.fixture?.date)}</p>
                <p>
                  <strong>{match.teams?.home?.name}</strong> vs <strong>{match.teams?.away?.name}</strong>
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default CompetitionMatches;
