import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FixtureWithOdds from '../components/FixtureWithOdds';
import FixtureEvents from '../components/FixtureEvents';

function FixtureDetails() {
  const { id } = useParams();
  const [fixture, setFixture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFixture = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/fixtures/${id}`, {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
          }
        });

        setFixture(response.data.response[0]);
      } catch (error) {
        console.error('Erro ao buscar Fixture Details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFixture();
  }, [id]);

  if (loading || !fixture) {
    return <p className="p-4 text-white">⏳ Carregando detalhes da partida...</p>;
  }

  const { teams, goals, league, fixture: fixtureInfo } = fixture;

  return (
    <div className="max-w-4xl mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-6">📋 Detalhes da Partida</h1>

      {/* Informações Gerais */}
      <div className="bg-gray-900 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-1">{league.name} - {league.round}</h2>
        <p className="text-sm text-gray-400">
          {new Date(fixtureInfo.date).toLocaleString('pt-BR')} | Status: {fixtureInfo.status.long}
        </p>
      </div>

      {/* Placar */}
      <div className="bg-gray-800 rounded p-4 shadow mb-6 flex items-center justify-between">
        {/* Time Casa */}
        <div className="flex items-center gap-2">
          <img src={teams.home.logo} alt={teams.home.name} className="w-8 h-8" />
          <span>{teams.home.name}</span>
        </div>

        {/* Placar */}
        <div className="text-2xl font-bold">
          {goals.home} - {goals.away}
        </div>

        {/* Time Visitante */}
        <div className="flex items-center gap-2">
          <span>{teams.away.name}</span>
          <img src={teams.away.logo} alt={teams.away.name} className="w-8 h-8" />
        </div>
      </div>

      {/* Odds */}
      <FixtureWithOdds fixtureId={fixture.fixture.id} />

      {/* Eventos */}
      <div className="bg-gray-800 rounded p-4 shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">⚡ Eventos da Partida</h2>
        <FixtureEvents fixtureId={id} />
      </div>

      {/* Estatísticas */}
      {fixture.statistics && fixture.statistics.length > 0 && (
        <div className="bg-gray-800 rounded p-4 shadow mt-6">
          <h2 className="text-xl font-semibold mb-4">📊 Estatísticas</h2>
          <ul className="space-y-2">
            {fixture.statistics.map((stat, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{stat.type}</span>
                <span>
                  {stat.statistics[0]?.value ?? 0} - {stat.statistics[1]?.value ?? 0}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FixtureDetails;
