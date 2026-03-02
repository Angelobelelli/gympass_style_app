# Estágio 1: Build
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Instala as dependências primeiro para aproveitar o cache do Docker
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

# Copia o restante do código e gera o build
COPY . .
RUN npx prisma generate
RUN npm run build

# Remove as dependências de desenvolvimento para economizar espaço
RUN npm prune --production

# Estágio 2: Run
FROM node:20-alpine

WORKDIR /usr/src/app

# Copia apenas o que é necessário do estágio de build
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/prisma ./prisma

# Define as variáveis de ambiente base
ENV NODE_ENV=production

# Expõe a porta que a aplicação vai rodar
EXPOSE 3333

# Comando para iniciar o servidor
CMD ["npm", "run", "start"]
