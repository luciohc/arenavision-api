const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = '928a8cbda9519aa32853c19e5f297981';
const LEAGUE_ID = 39; // Premier League
const SEASON = 2023;  // Temporada compatível com seu plano Free

// Cache simples para Standings
let cache = null
let cacheTimestamp = 0;
const CACHE_TTL = 300 * 1000; // 5 minutos

router.get('/', async (req, res) => {
  const now = Date.now();

  // Se o cache ainda for válido, retorna o cache
  if (cache && (now - cacheTimestamp < CACHE_TTL)) {
    console.log('Usando cache de Standings');
    return res.json(cache);
  }

  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/standings?league=${LEAGUE_ID}&season=${SEASON}`,
      {
        headers: { 'x-apisports-key': API_KEY }
      }
    );

    cache = response.data;
    cacheTimestamp = now;

    console.log('Dados de Standings atualizados da API-Football');
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar Standings:', error.response?.status, error.response?.data);
    res.status(500).json({
      error: 'Erro ao buscar Standings',
      status: error.response?.status,
      details: error.response?.data
    });
  }
});

module.exports = router;
