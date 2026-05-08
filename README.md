# 🏗️ Sistema de Gerenciamento de Obras

Sistema completo para controle de obras, depósitos, materiais e estoque, desenvolvido com uma arquitetura de camadas para garantir manutenibilidade e escalabilidade.

## 🚀 Stack Tecnológica

- **Backend:** Node.js, Express, TypeScript
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Autenticação:** JWT (JSON Web Tokens)
- **Frontend:** React 19, Vite, TypeScript, Lucide React, Axios

---

## 🛠️ Guia de Inicialização

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
   Crie um arquivo `.env` na raiz do backend com as seguintes chaves:
   ```env
   DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/nome_do_banco?schema=public"
   JWT_SECRET="sua_chave_secreta_aqui"
   PORT=3000
   ```
4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Inicie o servidor:
   ```bash
   npm run dev
   ```
   *A API estará disponível em `http://localhost:3000`*

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
   ```bash
   npm run dev
   ```
   *Acesse o link indicado no terminal (geralmente `http://localhost:5173`)*

---

## 📖 Fluxo de Uso do Sistema

1. **Cadastro/Login:** Crie sua conta na tela de registro e faça login para acessar o sistema.
2. **Cadastro de Obras:** Comece cadastrando as obras sob sua gestão.
3. **Criação de Depósitos:** Para cada obra, crie os depósitos onde os materiais serão armazenados.
4. **Catálogo de Materiais:** Cadastre os materiais (ex: Cimento, Areia) e suas unidades de medida.
5. **Controle de Estoque:**
   - Acesse um depósito e adicione materiais para realizar a "entrada".
   - Remova quantidades para registrar a "saída" (uso na obra).
   - Monitore os alertas de estoque baixo (destacados em vermelho).

## 📂 Estrutura de Pastas

- `backend/src`: Camadas de Interface, Aplicação, Domínio e Infraestrutura.
- `frontend/src`: Organização modular por serviços, componentes, hooks e páginas.
