# ⚽ API Futebol – SofaScore Clone

Uma API profissional que retorna **jogos ao vivo**, **próximos jogos**, **tabela de classificação**, **detalhes das partidas** e muito mais – integrada à [API-Football](https://www.api-football.com/), com cache, autenticação por API Key e documentação Swagger.

---

## 🚀 Como executar localmente

```bash
git clone https://github.com/seu-usuario/api-futebol.git
cd api-futebol/backend
npm install
cp .env.example .env
# edite sua API KEY no arquivo .env
npm start
```

---

## 📚 Documentação Swagger

- Acesse em: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

---

## 🔑 Autenticação

Todas as rotas protegidas exigem o header:

```
x-api-key: SUA_CHAVE_AQUI
```

Defina sua chave no arquivo `.env`:

```env
API_KEY=minha-chave-secreta
```

---

## 📦 Endpoints disponíveis

- `/api/livescores` – Jogos ao vivo
- `/api/fixtures` – Próximos jogos (com filtros: `league`, `season`, `date`, `status`, `next`)
- `/api/standings` – Classificação
- `/api/fixture/:id` – Detalhes da partida
- `/api/competition/:name/matches` – Jogos por competição
- `/api/status` – Health check da API

---

## 🧪 Exemplos de uso

### 🔹 `curl`

```bash
curl -X GET "http://localhost:3001/api/fixtures?league=39&season=2023" \
  -H "x-api-key: SUA_CHAVE"
```

---

### 🔹 `fetch` (JavaScript)

```js
fetch("http://localhost:3001/api/fixtures?league=39&season=2023", {
  headers: {
    "x-api-key": "SUA_CHAVE"
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

### 🔹 `axios` (Node.js)

```js
const axios = require('axios');

axios.get("http://localhost:3001/api/fixtures?league=39&season=2023", {
  headers: {
    "x-api-key": "SUA_CHAVE"
  }
})
.then(res => {
  console.log(res.data);
})
.catch(err => {
  console.error(err);
});
```

---

## ✅ Status

- Autenticação por chave de API
- Documentação Swagger
- Filtros dinâmicos com cache inteligente
- API pronta para deploy e publicação no RapidAPI

---

Desenvolvido por [Seu Nome](https://github.com/seu-usuario)
