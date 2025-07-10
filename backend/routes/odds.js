const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.FOOTBALL_API_KEY;

/**
 * @swagger
 * /odds:
 *   get:
 *     summary: Retorna odds de apostas para um jogo específico
 *     tags:
 *       - Odds
 *     parameters:
 *       - in: query
 *         name: fixture
 *         required: true
 *         schema:
 *           type: integer
 *           example: 12345
 *         description: ID do jogo (fixture) para buscar odds
 *     responses:
 *       200:
 *         description: Lista de odds por casa de aposta
 *       400:
 *         description: Parâmetro fixture obrigatório ausente
 *       500:
 *         description: Erro ao buscar dados de odds
 */

router.get('/', async (req, res) => {
  const { fixture } = req.query;

  if (!fixture) {
    return res.status(400).json({ error: 'Parâmetro "fixture" é obrigatório.' });
  }

  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/odds?fixture=${fixture}`,
      { headers: { 'x-apisports-key': API_KEY } }
    );

    console.log(fixture)
    console.log('API EXTERNA', API_KEY)

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar odds:', error.response?.data);
    res.status(500).json({
      error: 'Erro ao buscar odds',
      status: error.response?.status,
      details: error.response?.data
    });
  }
});

module.exports = router;
