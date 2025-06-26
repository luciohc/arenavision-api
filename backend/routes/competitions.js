// backend/routes/competitions.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:Al171178@@localhost:5432/api_futebol',
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// Rota correta usando router.get
router.get('/:name/matches', async (req, res) => {
  try {
    const competition = decodeURIComponent(req.params.name);
    const today = new Date().toISOString().split('T')[0];

    const liveGames = await pool.query(
      `SELECT * FROM jogos WHERE competition = $1 AND status = 'live'`,
      [competition]
    );

    const todayGames = await pool.query(
      `SELECT * FROM jogos WHERE competition = $1 AND date = $2`,
      [competition, today]
    );

    res.json({
      live: liveGames.rows,
      today: todayGames.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar jogos da competição.' });
  }
});

module.exports = router;
