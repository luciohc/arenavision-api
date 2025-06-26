import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopCompetitions from './components/TopCompetitions';
import TopPlayers from './components/TopPlayers';
import LiveScores from './pages/LiveScores';
import UpcomingFixtures from './pages/UpcomingFixtures';
import Standings from './pages/Standings';
import FixtureDetails from './pages/FixtureDetails';
import CompetitionMatches from './pages/CompetitionMatches';


function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Router>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                  {/* Coluna lateral esquerda */}
                  <div className="space-y-4">
                    <TopCompetitions />
                    <TopPlayers />
                  </div>

                  {/* Coluna central (conteúdo principal) */}
                  <div className="lg:col-span-2">
                    <LiveScores />
                  </div>
                </div>
              </>
            }
          />
          <Route path="/fixtures" element={<UpcomingFixtures />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/fixture/:id" element={<FixtureDetails />} />
          <Route path="/competition/:name" element={<CompetitionMatches />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
