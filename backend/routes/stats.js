const express = require('express');
const router = express.Router();
const axios = require('axios');

// Rota GET /api/fixture/:id/stats
router.get('/:id/stats', async (req, res) => {
  const fixtureId = req.params.id;

  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixtureId}`,
      {
        headers: {
          'x-apisports-key': process.env.FOOTBALL_API_KEY
        }
      }
    );

    res.json({
      fixture_id: fixtureId,
      statistics: response.data.response
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error.message);
    res.status(500).json({ error: "Erro ao buscar estatísticas do jogo." });
  }
});

module.exports = router;
