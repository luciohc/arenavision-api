// src/pages/FixtureStatsPage.js
import React from 'react';
import FixtureStats from '../components/FixtureStats';

function FixtureStatsPage() {
  const fixtureId = 10035039; // Pode vir da URL depois

  return (
    <div className="p-4">
      <FixtureStats fixtureId={fixtureId} />
    </div>
  );
}

export default FixtureStatsPage;
