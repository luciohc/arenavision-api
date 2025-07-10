# ⚽ Arena Vision API de Futebol

API RESTful para consulta de partidas ao vivo, estatísticas, classificações, escalações e odds de futebol.

## 🔗 Link da API (Produção)

> https://arenavision-api.onrender.com

## 🧪 Documentação Interativa (Swagger UI)

> https://arenavision-api.onrender.com/api-docs

Acesse e teste todos os endpoints diretamente no navegador com autenticação por chave de API.

---

## 🚀 Endpoints Disponíveis

### 🔴 Jogos Ao Vivo

`GET /api/livescores`

Retorna todos os jogos que estão acontecendo agora.

```json
[
  {
    "id": 123456,
    "league": "Premier League",
    "teams": {
      "home": "Arsenal",
      "away": "Chelsea"
    },
    "status": "2nd Half",
    "minute": 65,
    "score": {
      "home": 2,
      "away": 1
    }
  }
]
```

---

### 📅 Próximos Jogos

`GET /api/fixtures`

---

### 📊 Classificação Atual

`GET /api/standings`

---

### 🧾 Detalhes de uma Partida

`GET /api/fixture/{id}`

---

### 📈 Estatísticas do Jogo

`GET /api/fixture/{id}/stats`

---

### 📋 Escalações

`GET /api/fixture/{id}/lineups`

---

### 🎯 Eventos do Jogo

`GET /api/fixture/{id}/events`

---

### 💸 Odds por Casa de Apostas

`GET /api/fixture/{id}/odds`

---

### 🧠 Times Cadastrados

`GET /api/teams`

---

## 🔐 Autenticação

Todos os endpoints exigem uma chave de API personalizada.

### Headers obrigatórios:

```
x-api-key: SUA_CHAVE_AQUI
```

---

## 📁 Arquivo `.env` (exemplo)

Você pode configurar sua própria instância com o arquivo `.env` baseado neste:

```env
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/api_futebol
API_KEY=suachavepersonalizada
```

---

## 📌 Tecnologias Usadas

- Node.js + Express
- PostgreSQL
- Swagger (OpenAPI 3.0)
- Axios
- dotenv
- Render.com (Deploy)

---

## 👨‍💻 Autor

Desenvolvido por [Lúcio Costa](https://github.com/luciohc)
