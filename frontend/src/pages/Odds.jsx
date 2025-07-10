import React, { useState } from 'react';
import axios from 'axios';

// 🧪 MOCK de odds simuladas para testes sem API real
const fakeOdds = [
  {
    id: 1,
    name: "Bet365",
    bets: [
      {
        name: "Match Winner",
        values: [
          { value: "Home", odd: "1.55" },
          { value: "Draw", odd: "3.75" },
          { value: "Away", odd: "6.00" }
        ]
      },
      {
        name: "Total Goals Over/Under",
        values: [
          { value: "Over 2.5", odd: "1.85" },
          { value: "Under 2.5", odd: "1.95" }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Betano",
    bets: [
      {
        name: "Both Teams to Score",
        values: [
          { value: "Yes", odd: "1.65" },
          { value: "No", odd: "2.20" }
        ]
      }
    ]
  }
];

function Odds() {
  const [fixtureId, setFixtureId] = useState('');
  const [odds, setOdds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Função para simular odds com JSON mockado
  const simulateOdds = () => {
    setError(null);
    setLoading(true);
    setOdds([]);

    console.log("🧪 Modo simulado com fixture ID:", fixtureId);

    setTimeout(() => {
      setOdds(fakeOdds); // 🧪 carrega os dados mockados
      setLoading(false);
    }, 800); // simula tempo de resposta
  };

  // 🔒 Código original para buscar da API (desativado por limite atingido)
  const fetchOdds = async () => {
    setError(null);
    setLoading(true);
    setOdds([]);

    console.log("🔎 Enviando fixture ID:", fixtureId);
    console.log("🔐 Enviando x-api-key:", process.env.REACT_APP_API_KEY);

    try {
      const response = await axios.get(`http://localhost:3001/api/odds?fixture=${fixtureId}`, {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY
        }
      });

      console.log("📦 Resposta completa:", response.data);

      const firstItem = response.data?.response?.[0];
      if (firstItem && firstItem.bookmakers) {
        setOdds(firstItem.bookmakers);
      } else {
        setOdds([]);
      }

    } catch (err) {
      console.error('❌ Erro ao buscar odds:', err);
      setError('Erro ao buscar odds. Verifique o fixture ID.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">🎲 Odds por Casa de Aposta</h1>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Digite o ID do fixture (ex: 10035039)"
          value={fixtureId}
          onChange={(e) => setFixtureId(e.target.value)}
          className="px-3 py-2 text-black rounded w-full"
        />

        {/* 🔒 Botão para usar a API real (inativo por limite) */}
        {/* 
        <button
          onClick={fetchOdds}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
        */}

        {/* 🧪 Botão para simular odds com dados falsos */}
        <button
          onClick={simulateOdds}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Simular Odds
        </button>
      </div>

      {loading && <p>⏳ Carregando odds...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && odds.length === 0 && !error && (
        <p className="text-yellow-400">Nenhuma odd encontrada para este fixture.</p>
      )}

      {odds.length > 0 && (
        <div className="space-y-4">
          {odds.map((bookmaker) => (
            <div key={bookmaker.id} className="border border-gray-600 rounded p-3">
              <h2 className="text-lg font-semibold mb-2">
                🏢 {bookmaker.name}
              </h2>
              {bookmaker.bets.map((bet, i) => (
                <div key={i}>
                  <p className="text-blue-400 font-medium">{bet.name}</p>
                  <ul className="grid grid-cols-2 gap-2 mt-1 text-sm">
                    {bet.values.map((odd, j) => (
                      <li key={j}>
                        <span className="text-gray-300">{odd.value}</span>: <span className="font-bold">{odd.odd}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Odds;
