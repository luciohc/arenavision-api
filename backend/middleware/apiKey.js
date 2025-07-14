require('dotenv').config();

// Middleware para verificar chave da API
app.use((req, res, next) => {
  const apiKey = req.headers['x-rapidapi-key'];

  if (!apiKey || apiKey !== '30d754441dmsh2f51d5ab15cafe0p10dd53jsn3e54a7e29d19') {
    return res.status(401).json({ error: 'Chave de API inválida ou ausente.' });
  }

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
