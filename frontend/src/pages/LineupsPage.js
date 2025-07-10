// src/pages/LineupsPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import FixtureLineups from '../components/FixtureLineups';

function LineupsPage() {
  const { id } = useParams();

  return (
    <div>
      <FixtureLineups fixtureId={id} />
    </div>
  );
}

export default LineupsPage;
