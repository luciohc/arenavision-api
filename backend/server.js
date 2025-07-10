require('dotenv').config(); // Carrega variáveis de ambiente
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const auth = require('./middleware/apiKey'); // Middleware para verificar chave do frontend
const setupSwagger = require('./swagger-docs');
const statsRouter = require('./routes/stats');
const statusRouter = require('./routes/status');
const oddsRouter = require('./routes/odds');
const standingsRouter = require('./routes/standings');
const competitionsRouter = require('./routes/competitions');
const fixturesRouter = require('./routes/fixtures');
const externalRouter = require('./routes/external');
const lineupsRouter = require('./routes/lineups');
const playersRouter = require('./routes/players');
const eventsRouter = require('./routes/events');

const app = express();

// Middleware básico
app.use(cors());
app.use(express.json());

// Rota pública de status (sem proteção)
app.use('/api/status', statusRouter);
app.use('/api/fixture', lineupsRouter); // 🔐 Protegido com chave se necessário
// Swagger (pode ficar antes do middleware)
setupSwagger(app);

// 🌐 Conexão com PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Al171178@@localhost:5432/api_futebol',
  ssl: { rejectUnauthorized: false },
});

// 🔐 Aplica middleware para rotas que precisam de autenticação
app.use('/api', auth);

// ✅ Todas as rotas protegidas
app.use('/api/odds', oddsRouter);
app.use('/api/standings', standingsRouter);
app.use('/api/external', externalRouter);
app.use('/api/competition', competitionsRouter);
app.use('/api/fixtures', fixturesRouter);
app.use('/api/fixture', statsRouter); 
app.use('/api/players', playersRouter);
app.use('/api/fixture', eventsRouter);
app.use('/api/events', eventsRouter);


// Rota direta ao banco (jogos ao vivo)
app.get('/api/livescores', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM jogos WHERE status = 'live'`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar jogos ao vivo.' });
  }
});

// Rota direta ao banco (jogos do dia)
app.get('/api/fixtures/today', async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const result = await pool.query(`SELECT * FROM jogos WHERE date = $1`, [today]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar jogos do dia.' });
  }
});

// Rota mock se precisar testar sem banco
app.get('/api/standings/mock', (req, res) => {
  res.json([
    { team: 'Benfica', points: 45, played: 20, wins: 14, draws: 3, losses: 3, gf: 40, ga: 20 },
    { team: 'Bayern', points: 42, played: 20, wins: 13, draws: 3, losses: 4, gf: 39, ga: 22 },
    { team: 'Chelsea', points: 39, played: 20, wins: 12, draws: 3, losses: 5, gf: 35, ga: 25 },
  ]);
});

// 🚀 Inicialização
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
