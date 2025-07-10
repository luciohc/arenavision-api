const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.get('/:id/lineups', async (req, res) => {
  const fixtureId = req.params.id;
  const apiKey = process.env.FOOTBALL_API_KEY;

  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/fixtures/lineups?fixture=${fixtureId}`,
      {
        headers: {
          'x-apisports-key': apiKey
        }
      }
    );

    const data = response.data.response;

    const formattedLineups = data.map(team => ({
      team: team.team.name,
      formation: team.formation,
      coach: team.coach.name,
      startingXI: team.startXI.map(player => ({
        number: player.player.number,
        name: player.player.name,
        position: player.player.pos
      })),
      substitutes: team.substitutes.map(player => ({
        number: player.player.number,
        name: player.player.name,
        position: player.player.pos
      }))
    }));

    res.json({
      fixtureId,
      lineups: formattedLineups
    });

  } catch (error) {
    console.error('Erro ao buscar escalações:', error.message);
    res.status(500).json({ error: 'Erro ao buscar escalações dos times' });
  }
});

module.exports = router;
