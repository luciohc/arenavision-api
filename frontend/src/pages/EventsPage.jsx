// src/pages/EventsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/events', {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
          }
        });
        setEvents(response.data); // array com vários eventos
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  if (loading) return <p className="text-white p-4">⏳ Carregando eventos...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">⚽ Eventos Recentes</h1>
      <ul className="space-y-2">
        {events.map((event, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <span>{event.icon}</span>
            <span>{event.time}’ {event.player} - Jogo: {event.fixtureId}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsPage;
