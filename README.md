# ⚽ Arena Vision API de Futebol

API RESTful completa para consulta de informações sobre futebol em tempo real: **placares ao vivo, próximos jogos, classificações, estatísticas, escalações, eventos e odds de apostas**.

> Ideal para desenvolvedores que buscam dados atualizados de futebol para apps, bots, dashboards ou plataformas esportivas.

---

## 🌍 Link da API Online

- 🔗 Documentação Swagger: [https://arenavision-api.onrender.com/api-docs](https://arenavision-api.onrender.com/api-docs)
- 🔗 Exemplo de uso: [https://arenavision-api.onrender.com/api/livescores](https://arenavision-api.onrender.com/api/livescores)

---

## 📚 Endpoints Disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/livescores` | Lista de partidas ao vivo |
| GET | `/api/fixtures` | Lista de próximos jogos |
| GET | `/api/standings` | Classificação atual |
| GET | `/api/fixture/{id}` | Detalhes de uma partida |
| GET | `/api/fixture/{id}/stats` | Estatísticas da partida |
| GET | `/api/fixture/{id}/lineups` | Escalações |
| GET | `/api/fixture/{id}/events` | Eventos do jogo |
| GET | `/api/fixture/{id}/odds` | Odds de apostas |
| GET | `/api/teams` | Lista de times |

---

## 🔐 Autenticação por API Key

Todas as rotas são protegidas com chave de API. Use o header:

```bash
x-api-key: SUA_CHAVE
```

---

## 🛠️ Tecnologias Utilizadas

- Node.js + Express
- PostgreSQL
- Swagger UI
- Render (Deploy)
- GitHub (CI/CD)

---

## 🚀 Como usar localmente

```bash
git clone https://github.com/luciohc/arenavision-api.git
cd backend
npm install
npm start
```

---

## 📦 Variáveis de Ambiente (.env)

```env
PORT=3001
DATABASE_URL=postgresql://usuario:senha@localhost:5432/api_futebol
API_KEY=sua_chave_segura
```

---

## 📄 Licença

MIT — uso livre com atribuição.

---

## 👨‍💻 Autor

**Lúcio Costa**  
Desenvolvedor Full Stack & Educador em Tecnologia  
GitHub: [@luciohc](https://github.com/luciohc)
