import React from 'react';
import { useParams } from 'react-router-dom';
import FixtureEvents from '../components/FixtureEvents';

function FixtureEventsPage() {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">⚡ Eventos da Partida #{id}</h1>
      <FixtureEvents fixtureId={id} />
    </div>
  );
}

export default FixtureEventsPage;
