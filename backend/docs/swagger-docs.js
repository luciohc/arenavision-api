/**
 * @swagger
 * /fixtures:
 *   get:
 *     summary: Lista de jogos com filtros opcionais (direto da API-Football)
 *     parameters:
 *       - in: query
 *         name: league
 *         schema:
 *           type: string
 *         description: ID da liga (ex: 39)
 *       - in: query
 *         name: season
 *         schema:
 *           type: string
 *         description: Temporada (ex: 2023)
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Data no formato YYYY-MM-DD
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status da partida (live, scheduled, etc)
 *       - in: query
 *         name: next
 *         schema:
 *           type: integer
 *         description: Número de próximos jogos
 *     responses:
 *       200:
 *         description: Lista de partidas filtradas
 *       500:
 *         description: Erro ao buscar dados
 */

/**
 * @swagger
 * /standings:
 *   get:
 *     summary: Retorna a classificação (tabela) da liga
 *     responses:
 *       200:
 *         description: Tabela de classificação
 */

/**
 * @swagger
 * /livescores:
 *   get:
 *     summary: Retorna os jogos ao vivo salvos no banco de dados local
 *     responses:
 *       200:
 *         description: Lista de partidas em tempo real
 */

/**
 * @swagger
 * /fixtures/today:
 *   get:
 *     summary: Retorna jogos do dia atual
 *     responses:
 *       200:
 *         description: Lista de jogos do dia
 */

/**
 * @swagger
 * /competition/{name}/matches:
 *   get:
 *     summary: Retorna jogos ao vivo e agendados por nome da competição
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da competição (ex: FIFA Club World Cup)
 *     responses:
 *       200:
 *         description: Lista de partidas ao vivo e do dia por competição
 */
