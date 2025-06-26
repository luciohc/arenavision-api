import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FixtureDetails() {
  const { id } = useParams();
  const [fixture, setFixture] = useState(null);

  useEffect(() => {
    const fetchFixture = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/fixture/${id}`);
        setFixture(response.data.response[0]);
      } catch (error) {
        console.error('Erro ao buscar Fixture Details:', error);
      }
    };

    fetchFixture();
  }, [id]);

  if (!fixture) {
    return <p className="p-4 text-white">Carregando detalhes da partida...</p>;
  }

  const { teams, goals, fixture: fixtureInfo } = fixture;

  return (
    <div className="max-w-4xl mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-6">📋 Detalhes da Partida</h1>

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

      {/* Status */}
      <p className="text-sm text-gray-400 mb-4">Status: {fixtureInfo.status.long}</p>

      {/* Estatísticas (se existirem) */}
      {fixture.statistics && fixture.statistics.length > 0 && (
        <div className="bg-gray-800 rounded p-4 shadow">
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
