require('dotenv').config();


module.exports = function (req, res, next) {
  const userKey = req.headers['x-api-key'];
  const serverKey = process.env.API_KEY;
    
  if (!userKey || userKey !== serverKey) {
    return res.status(401).json({ error: 'Chave de API inválida ou ausente.' });
  }

  next();
};
