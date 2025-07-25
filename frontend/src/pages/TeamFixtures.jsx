import React, { useState } from 'react';
import axios from 'axios';
import { teams } from '../data/teams';
import Combobox from '../components/Combobox';

function TeamFixtures() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [fixtures, setFixtures] = useState([]);
  const [error, setError] = useState('');

  const fetchFixtures = async (teamName) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/fixtures/by-team?team=${teamName}`, {
        
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY
        }
      });

      const allFixtures = res.data;

      if (!allFixtures[teamName]) {
        setError('Time não encontrado nos dados simulados.');
        setFixtures([]);
        return;
      }

      setFixtures(allFixtures[teamName]);
      setError('');
    } catch (err) {
      console.error('❌ Erro ao carregar dados do backend:', err);
      setError('Erro ao buscar jogos do time.');
      setFixtures([]);
    }
  };

  const handleSelect = (team) => {
    setSelectedTeam(team);
    if (team) {
      fetchFixtures(team.value);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">🔍 Buscar Jogos por Time</h1>

      <Combobox
        options={teams}
        selectedOption={selectedTeam}
        onSelect={handleSelect}
        placeholder="Selecione um time"
      />

      {error && <p className="text-red-400 mt-4">{error}</p>}

      <div className="mt-4 space-y-2">
        {fixtures.map((fixture) => (
          <div key={fixture.fixture.id} className="bg-gray-800 rounded p-4 shadow">
            <div className="flex justify-between">
              <span>{fixture.teams.home.name} vs {fixture.teams.away.name}</span>
              <span>{new Date(fixture.fixture.date).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamFixtures;
