const express = require('express');
const router = express.Router();
const axios = require('axios');

const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY;
const API_FOOTBALL_URL = 'https://v3.football.api-sports.io';

router.get('/topscorers', async (req, res) => {
  const { league, season } = req.query;

  if (!league || !season) {
    return res.status(400).json({ error: 'Parâmetros "league" e "season" são obrigatórios.' });
  }

  try {
    const response = await axios.get(`${API_FOOTBALL_URL}/players/topscorers`, {
      headers: { 'x-apisports-key': FOOTBALL_API_KEY },
      params: { league, season }
    });

    res.json(response.data);
  } catch (err) {
    console.error('Erro ao buscar artilheiros:', err.message);
    res.status(500).json({ error: 'Erro ao buscar artilheiros.' });
  }
});

router.get('/topassists', async (req, res) => {
  const { league, season } = req.query;

  if (!league || !season) {
    return res.status(400).json({ error: 'Parâmetros "league" e "season" são obrigatórios.' });
  }

  try {
    const response = await axios.get(`${API_FOOTBALL_URL}/players/topassists`, {
      headers: { 'x-apisports-key': FOOTBALL_API_KEY },
      params: { league, season }
    });

    res.json(response.data);
  } catch (err) {
    console.error('Erro ao buscar assistências:', err.message);
    res.status(500).json({ error: 'Erro ao buscar assistências.' });
  }
});

module.exports = router;
