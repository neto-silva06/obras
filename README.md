# 🏗️ Sistema de Gerenciamento de Obras

Sistema completo para controle de obras, depósitos, materiais e estoque, desenvolvido com uma arquitetura de camadas para garantir manutenibilidade e escalabilidade.

## 🚀 Stack Tecnológica

- **Backend:** Node.js, Express, TypeScript
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Autenticação:** JWT (JSON Web Tokens)
- **Frontend:** React 19, Vite, TypeScript

---

## 🛠️ Guia de Inicialização (Monorepo)

### 1. Pré-requisitos
- Node.js (versão LTS recomendada)
- PostgreSQL instalado e rodando

### 2. Configuração do Backend

1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na pasta `backend/` com as seguintes chaves:
   ```env
   DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/nome_do_banco?schema=public"
   JWT_SECRET="sua_chave_secreta_aqui"
   PORT=3333
   ```
4. Gere o cliente Prisma e execute as migrações:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
5. Inicie o servidor:
   - Desenvolvimento: npm run d_e_v
   - Produção (Build): npm run build && npm s_t_a_r_t

   *A API estará disponível em `http://localhost:3333`*

### 3. Configuração do Frontend

1. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   npm run d_e_v

---

## ☁️ Deploy no Render

Para configurar o deploy da API no Render:
1. **Root Directory:** `backend`
2. **Build Command:** `npm install && npm run build`
3. **Start Command:** `npm s_t_a_r_t`
4. **Environment Variables:** Certifique-se de configurar `DATABASE_URL` e `JWT_SECRET` no painel do Render.

