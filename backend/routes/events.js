// routes/events.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id/events', async (req, res) => {
  const fixtureId = req.params.id;
  const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY;

  try {
    const response = await axios.get(`https://v3.football.api-sports.io/fixtures/events?fixture=${fixtureId}`, {
      headers: {
        'x-apisports-key': FOOTBALL_API_KEY
      }
    });

    const rawEvents = response.data.response;

    const mappedEvents = rawEvents.map(event => {
      const minute = event.time.elapsed;
      const player = event.player.name;
      const type = event.type;
      const detail = event.detail;

      let icon = '';
      if (type === 'Goal') icon = '⚽';
      else if (type === 'Card' && detail === 'Red Card') icon = '🟥';
      else if (type === 'Card' && detail === 'Yellow Card') icon = '🟨';
      else if (type === 'Substitution') icon = '🔁';
      else icon = '❔';

      return { time: `${minute}`, type, player, icon };
    });

    res.json({
      fixtureId,
      events: mappedEvents
    });

  } catch (error) {
    console.error("Erro ao buscar eventos:", error.message);
    res.status(500).json({ error: 'Erro ao buscar eventos da API externa.' });
  }
});


router.get('/', async (req, res) => {
  try {
    const fixtureIds = ['198772', '198773', '198774']; // exemplo: você pode buscar os IDs de uma lista real

    const responses = await Promise.all(
      fixtureIds.map(id =>
        axios.get(`https://v3.football.api-sports.io/fixtures/events?fixture=${id}`, {
          headers: { 'x-apisports-key': process.env.FOOTBALL_API_KEY }
        }).then(r => ({ fixtureId: id, events: r.data.response }))
      )
    );

    // achata os eventos
    const allEvents = responses.flatMap(f =>
      f.events.map(ev => ({
        fixtureId: f.fixtureId,
        time: ev.time.elapsed,
        player: ev.player.name,
        type: ev.type,
        detail: ev.detail,
        icon:
          ev.type === 'Goal' ? '⚽' :
          ev.type === 'Card' && ev.detail === 'Red Card' ? '🟥' :
          ev.type === 'Card' && ev.detail === 'Yellow Card' ? '🟨' :
          ev.type === 'Substitution' ? '🔁' : '❔'
      }))
    );

    res.json(allEvents);
  } catch (err) {
    console.error('Erro ao buscar múltiplos eventos:', err.message);
    res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
});


module.exports = router;
