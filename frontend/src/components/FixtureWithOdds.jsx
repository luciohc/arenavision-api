import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FixtureWithOdds({ fixtureId }) {
  const [odds, setOdds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/odds?fixture=${fixtureId}`, {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
          }
        });

        console.log("📦 Dados recebidos do backend:", response.data);

        const oddsData = response.data?.response; // ajuste aqui!

        if (!oddsData || oddsData.length === 0) {
          throw new Error("Nenhuma odd encontrada.");
        }

        setOdds(oddsData);
      } catch (err) {
        console.error('❌ Erro ao buscar odds:', err.message);
        setError(err.message || 'Erro ao buscar odds');
      } finally {
        setLoading(false);
      }
    };

    fetchOdds();
  }, [fixtureId]);

  if (loading) return <p>🔄 Carregando odds...</p>;
  if (error) return <p className="text-red-500">❌ {error}</p>;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2 text-white">📊 Odds para o jogo #{fixtureId}</h2>
      {odds.map((item, idx) => (
        <div key={idx} className="text-white mb-4">
          <p><strong>Casa de Apostas:</strong> {item.bookmaker.name}</p>
          {item.bets.map((bet, i) => (
            <div key={i} className="ml-4 mb-2">
              <p className="font-semibold">{bet.name}</p>
              <ul className="list-disc ml-4">
                {bet.values.map((val, j) => (
                  <li key={j}>
                    {val.value}: {val.odd}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default FixtureWithOdds;
