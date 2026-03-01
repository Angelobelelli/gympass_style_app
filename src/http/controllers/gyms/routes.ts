import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middleware/verify-jwt'
import { createGym } from './create'
import { nearbyGym } from './nearby'
import { searchGym } from './search'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', createGym)
  app.get('/gyms/search', searchGym)
  app.get('/gyms/nearby', nearbyGym)
}
