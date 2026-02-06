import { FastifyInstance } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export async function swaggerPlugin(app: FastifyInstance) {
  // Configuração base do Swagger
  await app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'API com Fastify, Prisma e TypeScript',
        description: 'Documentação da API usando Swagger',
        version: '1.0.0',
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  })

  // UI do Swagger (rota /docs)
  await app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
  })
}
