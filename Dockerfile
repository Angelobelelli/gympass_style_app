FROM node:22-alpine

WORKDIR /app

# Ativa corepack (gerenciador oficial que instala pnpm)
RUN corepack enable

# Copia arquivos de dependência
COPY package.json pnpm-lock.yaml ./

# Instala dependências
RUN pnpm install --frozen-lockfile

# Copia o restante do projeto
COPY . .

# Gera Prisma Client
RUN pnpm prisma generate

# Builda TypeScript
RUN pnpm build

EXPOSE 10000

CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/server.js"]
