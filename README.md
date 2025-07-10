# ⚽ Arena Vision API de Futebol

API RESTful completa para consulta de informações sobre futebol em tempo real: **placares ao vivo, próximos jogos, classificações, estatísticas, escalações, eventos e odds de apostas**.

> Ideal para desenvolvedores que buscam dados atualizados de futebol para apps, bots, dashboards ou plataformas esportivas.

---

## 🔗 URL Base da API

```
https://arenavision-api.onrender.com
```

> Substitua com sua URL real após o deploy.

---

## 📚 Endpoints Disponíveis

| Recurso | Rota | Descrição |
|--------|------|-----------|
| ✅ **Live Scores** | `/livescores` | Lista de partidas ao vivo |
| 📅 **Próximos Jogos** | `/fixtures` | Partidas futuras (com filtros por time/data) |
| 📊 **Classificação** | `/standings` | Tabela de ligas e campeonatos |
| 🔍 **Detalhes do Jogo** | `/fixture/:id` | Informações completas da partida |
| 📈 **Estatísticas** | `/fixture/:id/stats` | Dados como posse, finalizações, faltas etc. |
| 🧑‍🤝‍🧑 **Escalações** | `/fixture/:id/lineups` | Formação inicial e reservas |
| 🕒 **Eventos** | `/fixture/:id/events` | Gols, cartões, substituições em tempo real |
| 💰 **Odds de Apostas** | `/fixture/:id/odds` | Cotações e casas de aposta |
| 🧢 **Times** | `/teams` | Lista de todos os times disponíveis |

---

## 🔐 Autenticação

Todas as requisições devem incluir um cabeçalho com sua chave de API:

```
x-api-key: SUA_CHAVE_DE_API
```

### Exemplo de uso com curl:

```bash
curl -H "x-api-key: SUA_CHAVE" https://arenavision-api.onrender.com/livescores
```

---

## 🛠️ Tecnologias Utilizadas

- Node.js + Express
- API RESTful
- Axios
- Banco de dados (MongoDB ou PostgreSQL)
- Deploy via Render
- Integração com RapidAPI (opcional)

---

## 🚀 Instalação Local

```bash
git clone https://github.com/luciohc/arenavision-api.git
cd arenavision-api
npm install
npm start
```

> Certifique-se de configurar as variáveis de ambiente no arquivo `.env`.

---

## 📦 Publicação e Monetização

- ✅ Hospedagem: Render
- 💸 Comercialização: RapidAPI
- 🔐 Suporte a chaves de API com limite de requisições
- 📊 Pronto para ser integrado a dashboards, apps móveis e automações

---

## 📄 Licença

MIT – uso livre com atribuição ao autor.

---

## 👨‍💻 Autor

**Lúcio Costa**  
Desenvolvedor Full Stack & Educador em Tecnologia  
GitHub: [@luciohc](https://github.com/luciohc)

---

> ⭐ Se este projeto foi útil, deixe uma estrela no repositório e compartilhe com a comunidade!
