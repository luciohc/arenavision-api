import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Standings() {
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {


        const response = await axios.get('http://localhost:3001/api/standings', {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
          }
        });
        console.log("🔐 Enviando chave do frontend:", process.env.REACT_APP_API_KEY);
        console.log("📦 Dados recebidos do backend:", response.data);

        const standingsData = response.data?.response?.[0]?.league?.standings?.[0];

        if (!standingsData) {
          throw new Error('Dados de classificação não encontrados');
        }

        setTable(standingsData);
      } catch (err) {
        console.error('❌ Erro ao buscar standings:', err);
        setError('Erro ao carregar classificação. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">🏆 Classificação</h1>

      {loading && (
        <p className="text-white text-center">⏳ Carregando classificação...</p>
      )}

      {error && (
        <p className="text-red-500 text-center">{error}</p>
      )}

      {!loading && !error && table.length > 0 && (
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
                    <img
                      src={team.team.logo}
                      alt={`Escudo do ${team.team.name}`}
                      className="w-5 h-5 object-contain"
                    />
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
      )}

      {!loading && !error && table.length === 0 && (
        <p className="text-gray-400 text-center">Nenhuma classificação disponível no momento.</p>
      )}
    </div>
  );
}

export default Standings;
