import { beforeEach, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

// run the registration endpoints against the Fastify instance using app.inject()

describe('Users controller (e2e)', () => {
  beforeEach(async () => {
    // clear database between tests to keep them isolated
    await prisma.checkIn.deleteMany()
    await prisma.gym.deleteMany()
    await prisma.user.deleteMany()
  })

  it('should be able to register a new user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
      },
    })

    expect(response.statusCode).toBe(201)
  })

  it('should return 409 when attempting to register with an existing email', async () => {
    const payload = {
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    }

    await app.inject({ method: 'POST', url: '/users', payload })

    const second = await app.inject({ method: 'POST', url: '/users', payload })

    expect(second.statusCode).toBe(409)
    const body = JSON.parse(second.body)
    expect(body).toMatchObject({ message: expect.any(String) })
  })
})
