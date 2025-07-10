// Novo componente aprimorado para exibir filtros e jogos com axios
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FixturesPage() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ league: '39', season: '2023', status: '', date: '' });
  const [error, setError] = useState(null);

  const fetchFixtures = async () => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    for (const key in filters) {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    }

    try {
      const response = await axios.get(`http://localhost:3001/api/fixtures?${params.toString()}`, {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY
        }
      });

      setFixtures(response.data.response || []);
    } catch (err) {
      console.error('Erro ao buscar fixtures:', err);
      setError('Erro ao buscar fixtures. Verifique a chave da API e o servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFixtures();
  }, [filters]);

  return (
    <div className="bg-zinc-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">🔎 Procurar Jogos</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <select
          className="bg-zinc-800 text-white p-2 rounded"
          value={filters.league}
          onChange={(e) => setFilters(prev => ({ ...prev, league: e.target.value }))}
        >
          <option value="">Todas as Ligas</option>
          <option value="39">Premier League</option>
          <option value="71">Brasileirão</option>
          <option value="2">UEFA Champions League</option>
        </select>

        <input
          type="number"
          className="bg-zinc-800 text-white p-2 rounded"
          placeholder="Temporada (ex: 2023)"
          value={filters.season}
          onChange={(e) => setFilters(prev => ({ ...prev, season: e.target.value }))}
        />

        <input
          type="date"
          className="bg-zinc-800 text-white p-2 rounded"
          value={filters.date}
          onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
        />

        <select
          className="bg-zinc-800 text-white p-2 rounded"
          value={filters.status}
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
        >
          <option value="">Todos os Status</option>
          <option value="NS">Não iniciado</option>
          <option value="LIVE">Ao Vivo</option>
          <option value="FT">Finalizado</option>
        </select>
      </div>

      {loading ? (
        <p className="text-blue-400">⏳ Carregando jogos...</p>
      ) : error ? (
        <p className="text-red-400">❌ {error}</p>
      ) : fixtures.length === 0 ? (
        <p className="text-gray-400">Nenhum jogo encontrado com os filtros selecionados.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {fixtures.map((match) => (
            <div key={match.fixture.id} className="bg-zinc-800 p-4 rounded shadow hover:bg-zinc-700">
              <p className="text-sm text-gray-400">{new Date(match.fixture.date).toLocaleString()}</p>
              <p className="font-bold">
                {match.teams.home.name} {match.goals.home} - {match.goals.away} {match.teams.away.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">{match.league.name} ({match.league.season})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FixturesPage;
