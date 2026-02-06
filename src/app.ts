import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { swaggerPlugin } from './lib/swagger'

export const app = fastify()

app.register(swaggerPlugin)

app.register(appRoutes)
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    // Deve fazer o log uma ferramenta de monitoramento externa: Datadog, Sentry, etc.
  }
  return reply.status(500).send({ message: 'Internal server error' })
})
