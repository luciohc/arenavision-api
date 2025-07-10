const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());



// Importando as rotas
const liveScores = require('./routes/liveScores');
const fixtures = require('./routes/fixtures');
const standings = require('./routes/standings');
const fixtureDetails = require('./routes/fixtureDetails');

// Definindo os endpoints
app.use('/livescores', liveScores);
app.use('/fixtures', fixtures);
app.use('/standings', standings);
app.use('/fixture', fixtureDetails);

module.exports = app;
