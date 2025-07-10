// backend/swagger-docs.js

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Futebol SofaScore Clone',
      version: '1.0.0',
      description: 'Documentação da API com dados de futebol ao vivo, próximos jogos e classificações.',
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key',
          description: 'Insira sua chave de API para autenticação.',
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './server.js'], // Caminhos dos arquivos onde estarão os comentários @swagger
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
