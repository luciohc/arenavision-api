const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = '928a8cbda9519aa32853c19e5f297981';
const LEAGUE_ID = 39;
const SEASON = 2023;

// Cache simples em memória
let cache = null;
let cacheTimestamp = 0;
const CACHE_TTL = 60 * 1000; // 60 segundos

router.get('/', async (req, res) => {
  const now = Date.now();

  // Se cache for recente, devolve o cache
  if (cache && (now - cacheTimestamp < CACHE_TTL)) {
    console.log('Usando cache de fixtures');
    return res.json(cache);
  }

  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/fixtures?league=${LEAGUE_ID}&season=${SEASON}&next=50`,
      {
        headers: { 'x-apisports-key': API_KEY }
      }
    );

    cache = response.data;
    cacheTimestamp = now;

    console.log('Dados de fixtures atualizados da API-Football');
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar fixtures:', error.response?.status, error.response?.data);
    res.status(500).json({
      error: 'Erro ao buscar fixtures',
      status: error.response?.status,
      details: error.response?.data
    });
  }
});

module.exports = router;
