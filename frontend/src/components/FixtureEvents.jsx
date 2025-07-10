import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FixtureEvents({ fixtureId }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/fixture/${fixtureId}/events`, {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
          }
        });
        setEvents(response.data.events);
      } catch (err) {
        console.error("Erro ao buscar eventos:", err);
        setError('Erro ao carregar eventos.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [fixtureId]);

  if (loading) return <p className="text-gray-300">⏳ Carregando eventos...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md text-white">
      <h2 className="text-xl font-semibold mb-3">📋 Eventos da Partida</h2>
      {events.length === 0 ? (
        <p className="text-gray-400">Nenhum evento disponível.</p>
      ) : (
        <ul className="space-y-2">
          {events.map((event, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span>{event.icon}</span>
              <span className="text-sm">
                {event.time}’ {event.player}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FixtureEvents;
