require('dotenv').config();

// backend/middleware/apiKey.js
/*module.exports = (req, res, next) => {
  const apiKey = req.headers['x-rapidapi-key'];
  const validKey = process.env.API_KEY; // ou insira diretamente sua chave como string

  if (!apiKey || apiKey !== validKey) {
    return res.status(401).json({ error: 'Chave de API inválida ou ausente.' });
  }

  next();
};*/



module.exports = function (req, res, next) {
  const userKey = req.headers['x-api-key'];
  const serverKey = process.env.API_KEY;
    
  if (!userKey || userKey !== serverKey) {
    return res.status(401).json({ error: 'Chave de API inválida ou ausente.' });
  }

  next();
};
