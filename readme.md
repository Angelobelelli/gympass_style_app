# Gympass Style API 🏋️‍♂️

Uma API de serviço de check-ins em academias, inspirada no modelo de negócio do Gympass, desenvolvida com foco em **Arquitetura Limpa (Clean Architecture)**, **Princípios SOLID** e **Testes Automatizados**.

## 🚀 Tecnologias e Ferramentas

- **Node.js** & **TypeScript**
- **Fastify** (Framework web de alta performance)
- **Prisma** (ORM para persistência de dados)
- **PostgreSQL** (Banco de dados relacional)
- **Vitest** (Framework de testes unitários e E2E)
- **Zod** (Validação de esquemas e dados)
- **JWT (JSON Web Token)** (Autenticação e Refresh Token)
- **Docker** (Containerização do banco de dados)

## 🏗️ Arquitetura e Padrões de Desenvolvimento

O projeto foi construído seguindo rigorosos padrões de engenharia de software:

- **SOLID Principles**: Garantindo código modular, escalável e de fácil manutenção.
- **Clean Architecture / UseCases**: Separação clara das regras de negócio (UseCases) da camada de infraestrutura (Controllers/HTTP).
- **Repository Pattern**: Abstração da lógica de persistência, facilitando a troca de banco de dados e o uso de mocks em testes.
- **Inversão de Dependência (DIP)**: Uso de fábricas (Factories) para injetar dependências nos UseCases.
- **Factory Pattern**: Centralização da criação de instâncias complexas.

## 🧪 Estratégia de Testes

- **Testes Unitários**: Cobertura das regras de negócio com alta performance utilizando repositórios em memória.
- **Testes E2E (End-to-End)**: Validação de todos os fluxos HTTP utilizando ambientes de teste isolados com Prisma.

## 🛠️ Regras de Negócio (Requisitos)

### RN (Regras de Negócio)
- [x] O usuário não pode se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores.

### RF (Requisitos Funcionais)
- [x] Cadastro de usuários;
- [x] Autenticação de usuários;
- [x] Perfil do usuário logado;
- [x] Histórico de check-ins do usuário;
- [x] Busca de academias (pelo nome ou proximidade);
- [x] Check-in do usuário em uma academia;
- [x] Validação do check-in.

### RNF (Requisitos Não Funcionais)
- [x] Senhas criptografadas;
- [x] Dados persistidos em PostgreSQL;
- [x] Paginação em todas as listas;
- [x] Autenticação via JWT.

## 🏁 Como Executar

1. Instale as dependências: `npm install`
2. Configure o arquivo `.env` (use o `.env.example` como base)
3. Suba o banco de dados com Docker: `docker-compose up -d`
4. Execute as migrations: `npx prisma migrate dev`
5. Inicie o servidor: `npm run dev`

---

Desenvolvido com 💜 por Angelo Belelli
