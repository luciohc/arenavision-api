const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = '928a8cbda9519aa32853c19e5f297981'; // Substitua pela sua chave válida

router.get('/livescores', async (req, res) => {
  try {
    const response = await axios.get('https://v3.football.api-sports.io/fixtures?live=all', {
      headers: {
        'x-apisports-key': API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar dados externos:', error.message);
    res.status(500).json({ error: 'Erro ao buscar dados externos' });
  }
});

module.exports = router;
