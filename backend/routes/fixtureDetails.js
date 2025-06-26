const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = '928a8cbda9519aa32853c19e5f297981';

// Cache por ID de Fixture
const cache = {};
const CACHE_TTL = 600 * 1000; // 10 minutos

router.get('/:id', async (req, res) => {
  const fixtureId = req.params.id;
  const now = Date.now();

  // Se já existe cache válido para este ID, devolve o cache
  if (cache[fixtureId] && (now - cache[fixtureId].timestamp < CACHE_TTL)) {
    console.log(`Usando cache de FixtureDetails para fixtureId: ${fixtureId}`);
    return res.json(cache[fixtureId].data);
  }

  try {
    const response = await axios.get(`https://v3.football.api-sports.io/fixtures?id=${fixtureId}`, {
      headers: { 'x-apisports-key': API_KEY }
    });

    // Salva no cache
    cache[fixtureId] = {
      data: response.data,
      timestamp: now
    };

    console.log(`Dados de FixtureDetails atualizados da API-Football para fixtureId: ${fixtureId}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar Fixture Details:', error.response?.status, error.response?.data);
    res.status(500).json({
      error: 'Erro ao buscar Fixture Details',
      status: error.response?.status,
      details: error.response?.data
    });
  }
});

module.exports = router;
