# 📊 API Futebol SofaScore Clone

API RESTful para consultar informações de futebol em tempo real, com layout e estrutura inspirados no site SofaScore.

## ✅ Base URL (Ambiente de Produção):

https://SEU-BACKEND-NO-RENDER/api

Durante o desenvolvimento local:

http://localhost:3001

## ✅ Endpoints Disponíveis

### 📍 GET /livescores
**Descrição:** Retorna todos os jogos ao vivo no momento, incluindo nomes dos times, escudos, placar e status da partida.
**Cache:** 30 segundos.

### 📍 GET /fixtures
**Descrição:** Lista os próximos 50 jogos programados da Premier League (temporada 2023).
**Cache:** 60 segundos.

### 📍 GET /standings
**Descrição:** Retorna a tabela de classificação da Premier League, temporada 2023.
**Cache:** 5 minutos.

### 📍 GET /fixture/:id
**Descrição:** Retorna os detalhes completos de uma partida específica pelo Fixture ID.
**Parâmetros de URL:** :id → ID numérico da partida.
**Cache:** 10 minutos (individual por Fixture ID).

## ✅ Controle de Cache (TTL por rota):

| Endpoint | Cache TTL |
|---|---|
| /livescores | 30 segundos |
| /fixtures | 60 segundos |
| /standings | 5 minutos |
| /fixture/:id | 10 minutos |

## ✅ Autenticação:

❌ Atualmente sem autenticação para consumo externo.  
✅ Apenas o backend interno utiliza sua API Key privada da API-Football.

## ✅ Observação Final:

> Atenção: Este projeto utiliza dados da [API-Football](https://www.api-football.com/) e está sujeito às limitações do seu plano (Free/Paid).

## ✅ Contato do Desenvolvedor:

Se precisar de suporte ou quiser contratar melhorias:

- 📧 Email: SEUEMAIL@example.com
- 🌐 GitHub: https://github.com/SEU-USUARIO
