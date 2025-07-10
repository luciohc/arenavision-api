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
import FixturesPage from './pages/FixturesPage'; // ou o caminho correto
import Home from './pages/Home';
import Odds from './pages/Odds'; // importe no topo
import FixtureStatsPage from './pages/FixtureStatsPage';
import LineupsPage from './pages/LineupsPage';
import Players from './pages/Players';
import FixtureEventsPage from './pages/FixtureEventsPage';
import EventsPage from './pages/EventsPage';
import TeamFixtures from './pages/TeamFixtures';

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
          <Route path="/" element={<Home />} />
          <Route path="/fixtures" element={<FixturesPage />} />
          <Route path="/fixtures/upcoming" element={<UpcomingFixtures />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/fixture/:id" element={<FixtureDetails />} />
          <Route path="/competition/:name" element={<CompetitionMatches />} />
          <Route path="/odds" element={<Odds />} />
          <Route path="/stats" element={<FixtureStatsPage />} />
          <Route path="/fixture/:id/lineups" element={<LineupsPage />} />
          <Route path="/players" element={<Players />} />
          <Route path="/fixture/:id/stats" element={<FixtureDetails />} />
          <Route path="/fixture/:id/events" element={<FixtureEventsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/team-fixtures" element={<TeamFixtures />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App

