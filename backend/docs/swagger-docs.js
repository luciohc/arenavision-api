const swaggerDocument = {
  "openapi": "3.0.0",
  "info": {
    "title": "Arena Vision API de Futebol",
    "description": "API RESTful para consulta de partidas ao vivo, estat\u00edsticas, classifica\u00e7\u00f5es, escala\u00e7\u00f5es e odds de futebol.",
    "version": "1.0.0"
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Servidor Local"
    }
  ]
  ,
  "paths": {
    "/api/livescores": {
      "get": {
        "summary": "Listar partidas ao vivo",
        "description": "Retorna uma lista de jogos que est\u00e3o acontecendo no momento.",
        "responses": {
          "200": {
            "description": "Lista de partidas ao vivo retornada com sucesso"
          }
        },
        "parameters": [],
        "security": [
          {
            "apiKeyAuth": []
          }
        ]
      }
    },
    "/api/fixtures": {
      "get": {
        "summary": "Listar pr\u00f3ximos jogos",
        "description": "Retorna uma lista de partidas futuras, com op\u00e7\u00e3o de filtros.",
        "responses": {
          "200": {
            "description": "Lista de pr\u00f3ximos jogos retornada com sucesso"
          }
        },
        "parameters": [],
        "security": [
          {
            "apiKeyAuth": []
          }
        ]
      }
    },
    "/api/standings": {
      "get": {
        "summary": "Classifica\u00e7\u00e3o atual",
        "description": "Retorna a tabela de classifica\u00e7\u00e3o das ligas dispon\u00edveis.",
        "responses": {
          "200": {
            "description": "Tabela retornada com sucesso"
          }
        },
        "parameters": [],
        "security": [
          {
            "apiKeyAuth": []
          }
        ]
      }
    },
    "/api/fixture/{id}": {
      "get": {
        "summary": "Detalhes de uma partida",
        "description": "Retorna detalhes da partida com ID espec\u00edfico.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Detalhes da partida retornados com sucesso"
          }
        },
        "security": [
          {
            "apiKeyAuth": []
          }
        ]
      }
    },
    "/api/fixture/{id}/stats": {
      "get": {
        "summary": "Estat\u00edsticas do jogo",
        "description": "Retorna estat\u00edsticas detalhadas da partida.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Estat\u00edsticas retornadas com sucesso"
          }
        },
        "security": [
          {
            "apiKeyAuth": []
          }
        ]
      }
    },
    "/api/fixture/{id}/lineups": {
      "get": {
        "summary": "Escala\u00e7\u00f5es",
        "description": "Retorna escala\u00e7\u00f5es dos times da partida.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Escala\u00e7\u00f5es retornadas com sucesso"
          }
        },
        "security": [
          {
            "apiKeyAuth": []
          }
        ]
      }
    },
    "/api/fixture/{id}/events": {
      "get": {
        "summary": "Eventos do jogo",
        "description": "Retorna todos os eventos da partida como gols, cart\u00f5es, substitui\u00e7\u00f5es.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Eventos retornados com sucesso"
          }
        },
        "security": [
          {
            "apiKeyAuth": []
          }
        ]
      }
    },
    "/api/fixture/{id}/odds": {
      "get": {
        "summary": "Odds de apostas",
        "description": "Retorna as odds das casas de aposta para a partida.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Odds retornadas com sucesso"
          }
        },
        "security": [
          {
            "apiKeyAuth": []
          }
        ]
      }
    },
    "/api/teams": {
      "get": {
        "summary": "Listar times",
        "description": "Retorna todos os times dispon\u00edveis.",
        "responses": {
          "200": {
            "description": "Lista de times retornada com sucesso"
          }
        },
        "parameters": [],
        "security": [
          {
            "apiKeyAuth": []
          }
        ]
      }
    }
  },
  "components": {
    "securitySchemes": {
      "apiKeyAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "x-api-key"
      }
    }
  }
};

module.exports = swaggerDocument;
