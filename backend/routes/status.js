const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Verifica o status da API
 *     description: Endpoint de health check que retorna informações básicas sobre a saúde da API.
 *     tags:
 *       - Status
 *     responses:
 *       200:
 *         description: API funcionando normalmente
 *         content:
 *           application/json:
 *             example:
 *               status: OK
 *               uptime: 123456
 *               timestamp: "2025-07-02T15:30:00Z"
 */

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(), // em segundos
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
