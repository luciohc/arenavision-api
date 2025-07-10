const express = require('express');
const axios = require('axios');
const router = express.Router();

const LEAGUE_ID = 39;
const SEASON = 2023;

// 🔐 Chaves de autenticação
const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY; // Chave secreta da API-Football
const FRONTEND_API_KEY = process.env.API_KEY || '12345'; // Chave esperada do frontend

// 🧠 Cache simples em memória
let cache = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

// 🔐 Middleware para verificar chave enviada pelo frontend
router.use((req, res, next) => {
  const clientApiKey = req.headers['x-api-key'];

  if (!clientApiKey || clientApiKey !== FRONTEND_API_KEY) {
    console.warn('🔐 Chave de API inválida ou ausente do frontend:', clientApiKey);
    return res.status(401).json({ error: 'Chave de API inválida ou ausente.' });
  }

  next();
});

// ⚽ GET /api/standings — Dados de classificação
router.get('/', async (req, res) => {
  const now = Date.now();

  // 📦 Retorna do cache se válido
  if (cache && (now - cacheTimestamp < CACHE_TTL)) {
    console.log('✅ Enviando standings do cache');
    return res.json(cache);
  }

  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/standings?league=${LEAGUE_ID}&season=${SEASON}`,
      {
        headers: {
          'x-apisports-key': FOOTBALL_API_KEY
        }
      }
    );

    // 🆕 Atualiza cache
    cache = response.data;
    cacheTimestamp = now;

    console.log('✅ Standings atualizados da Football API');
    res.json(response.data);

  } catch (error) {
    console.error('❌ Erro ao buscar standings:', error.response?.status);
    res.status(error.response?.status || 500).json({
      error: 'Erro ao buscar standings',
      status: error.response?.status,
      details: error.response?.data || error.message
    });
  }
});

module.exports = router;
