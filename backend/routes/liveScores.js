const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = '928a8cbda9519aa32853c19e5f297981';

// Cache simples para LiveScores
let cache = null;
let cacheTimestamp = 0;
const CACHE_TTL = 30 * 1000; // 30 segundos (ideal para dados ao vivo)

router.get('/', async (req, res) => {
  const now = Date.now();

  // Se o cache estiver dentro do TTL, devolve o cache
  if (cache && (now - cacheTimestamp < CACHE_TTL)) {
    console.log('Usando cache de LiveScores');
    return res.json(cache);
  }

  try {
    const response = await axios.get('https://v3.football.api-sports.io/fixtures?live=all', {
      headers: { 'x-apisports-key': API_KEY }
    });

    cache = response.data;
    cacheTimestamp = now;

    console.log('Dados de LiveScores atualizados da API-Football');
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar LiveScores:', error.response?.status, error.response?.data);
    res.status(500).json({
      error: 'Erro ao buscar LiveScores',
      status: error.response?.status,
      details: error.response?.data
    });
  }
});

module.exports = router;
