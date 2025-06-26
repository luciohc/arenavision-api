const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());


// Conexão com o PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://usuario:senha@localhost:5432/api_futebol',
  ssl: { rejectUnauthorized: false },
});

// Conectando rotas
const externalRouter = require('./routes/external');
const standingsRouter = require('./routes/standings');

app.use('/api/standings', standingsRouter);
app.use('/api/external', externalRouter);


// 🔗 Rota para jogos por competição
const competitionsRouter = require('./routes/competitions');
app.use('/api/competition', competitionsRouter);

// 🟢 Jogos ao vivo
app.get('/api/livescores', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM jogos WHERE status = 'live'`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar jogos ao vivo.' });
  }
});

// 📅 Jogos do dia
app.get('/api/fixtures', async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const result = await pool.query(`SELECT * FROM jogos WHERE date = $1`, [today]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar jogos do dia.' });
  }
});

// 📊 Classificação (Mock por enquanto)
app.get('/api/standings', (req, res) => {
  res.json([
    { team: 'Benfica', points: 45, played: 20, wins: 14, draws: 3, losses: 3, gf: 40, ga: 20 },
    { team: 'Bayern', points: 42, played: 20, wins: 13, draws: 3, losses: 4, gf: 39, ga: 22 },
    { team: 'Chelsea', points: 39, played: 20, wins: 12, draws: 3, losses: 5, gf: 35, ga: 25 },
  ]);
});

// 🟢 Inicialização do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
