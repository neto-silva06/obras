# 🏗️ Sistema de Gerenciamento de Obras - Backend

Sistema completo para controle de obras, depósitos, materiais e estoque.

## 🚀 Stack Tecnológica

- **Backend:** Node.js, Express, TypeScript
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Autenticação:** JWT (JSON Web Tokens)

---

## 🛠️ Guia de Inicialização

### 1. Pré-requisitos
- Node.js (versão LTS recomendada)
- PostgreSQL instalado e rodando

### 2. Configuração

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure as variáveis de ambiente:
   Crie um arquivo `.env` com as seguintes chaves:
   ```env
   DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/nome_do_banco?schema=public"
   JWT_SECRET="sua_chave_secreta_aqui"
   PORT=3333
   ```
3. Gere o cliente Prisma e execute as migrações:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
4. Inicie o servidor:
   - Desenvolvimento: `npm run dev`
   - Produção: `npm run build && npm start`

   *A API estará disponível em `http://localhost:3333`*

---

## ☁️ Deploy no Render

1. **Root Directory:** `backend`
2. **Build Command:** `npm install && npm run build`
3. **Start Command:** `npm start`
4. **Environment Variables:** Certifique-se de configurar `DATABASE_URL` e `JWT_SECRET`.
