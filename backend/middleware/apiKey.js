require('dotenv').config();

// Middleware para verificar chave da API
app.use((req, res, next) => {
  const apiKey = req.headers['x-rapidapi-key'];
  const validKey = process.env.API_KEY; // ou direto 'sua-chave'

  if (!apiKey || apKey !== validKey) {
    return res.status(401).json({ error: 'Chave de API inválida ou ausente.' });
  }
s
  next();
});


/*module.exports = function (req, res, next) {
  const userKey = req.headers['x-api-key'];
  const serverKey = process.env.API_KEY;
    
  if (!userKey || userKey !== serverKey) {
    return res.status(401).json({ error: 'Chave de API inválida ou ausente.' });
  }

  next();
};*/
