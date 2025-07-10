const axios = require('axios');

const getStandings = async (req, res) => {
  try {
    const { league = 39, season = 2023 } = req.query; // Exemplo: Premier League 2023
    const response = await axios.get(`https://v3.football.api-sports.io/standings`, {
      params: { league, season },
      headers: {
        'x-apisports-key': process.env.FOOTBALL_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar standings da API externa:', error.message);
    res.status(500).json({ error: 'Erro ao buscar standings.' });
  }
};

module.exports = {
  getStandings,
};
