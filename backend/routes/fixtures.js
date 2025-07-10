const express = require('express');
const axios = require('axios');
const router = express.Router();

// 🔐 Chaves de autenticação
const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY;
const FRONTEND_API_KEY = process.env.API_KEY;

// 🧠 Cache em memória para evitar requisições repetidas
const cacheStore = {};
const CACHE_TTL = 60 * 1000; // 60 segundos

// ✅ GET /api/fixtures/by-team?team=Barcelona — busca jogos por nome do time
router.get('/by-team', async (req, res) => {
  const teamName = req.query.team;
  const clientApiKey = req.headers['x-api-key'];

  if (!clientApiKey || clientApiKey !== FRONTEND_API_KEY) {
    return res.status(401).json({ error: 'Chave de API inválida ou ausente.' });
  }

  if (!teamName) {
    return res.status(400).json({ error: 'Parâmetro "team" é obrigatório.' });
  }

  try {
    // 1. Buscar ID do time pelo nome
    const teamRes = await axios.get('https://v3.football.api-sports.io/teams', {
      params: { search: teamName },
      headers: {
        'x-apisports-key': FOOTBALL_API_KEY
      }
    });


    const teamId = teamRes.data.response[0]?.team?.id;
    console.log('🔍 ID do time encontrado:', teamId);

    if (!teamId) {
      return res.status(404).json({ error: 'Time não encontrado na API.' });
    }

    // 2. Buscar jogos do time
    const fixturesRes = await axios.get('https://v3.football.api-sports.io/fixtures', {
      params: {
        team: teamId,
        season: 2023
      },
      headers: {
        'x-apisports-key': FOOTBALL_API_KEY
      }
    });


    res.json({ [teamName]: fixturesRes.data.response });
  } catch (err) {
    console.error('❌ Erro ao buscar jogos por time:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'Erro ao buscar jogos por time.' });
  }
});


// ✅ GET /api/fixtures — busca geral com filtros (league, season, etc)
router.get('/', async (req, res) => {
  const { league, season, date, status, next } = req.query;
  const clientApiKey = req.headers['x-api-key'];

  // Validação da chave do frontend
  if (!clientApiKey || clientApiKey !== FRONTEND_API_KEY) {
    return res.status(401).json({ error: 'Chave de API inválida ou ausente.' });
  }

  // Monta a URL com filtros opcionais
  let url = 'https://v3.football.api-sports.io/fixtures?';
  if (league) url += `league=${league}&`;
  if (season) url += `season=${season}&`;
  if (date) url += `date=${date}&`;
  if (status) url += `status=${status}&`;
  if (next) url += `next=${next}&`;

  const now = Date.now();

  if (cacheStore[url] && (now - cacheStore[url].timestamp < CACHE_TTL)) {
    console.log('✅ Usando cache:', url);
    return res.json(cacheStore[url].data);
  }

  try {
    const response = await axios.get(url, {
      headers: { 'x-apisports-key': FOOTBALL_API_KEY }
    });

    cacheStore[url] = {
      data: response.data,
      timestamp: now
    };

    console.log('📡 Dados atualizados da API-Football');
    res.json(response.data);
  } catch (error) {
    console.error('❌ Erro ao buscar fixtures:', error.message);
    res.status(500).json({ error: 'Erro ao buscar fixtures' });
  }
});

// ✅ GET /api/fixtures/:id — busca fixture por ID
router.get('/:id', async (req, res) => {
  const fixtureId = req.params.id;

  try {
    const response = await axios.get(`https://v3.football.api-sports.io/fixtures?id=${fixtureId}`, {
      headers: {
        'x-apisports-key': FOOTBALL_API_KEY
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('❌ Erro ao buscar fixture por ID:', err.message);
    res.status(500).json({ error: 'Erro ao buscar dados da partida' });
  }
});


module.exports = router;
