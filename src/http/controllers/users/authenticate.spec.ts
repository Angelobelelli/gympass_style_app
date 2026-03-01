import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

// end-to-end tests for the sessions endpoint

describe('Sessions controller (e2e)', () => {
  beforeEach(async () => {
    await prisma.checkIn.deleteMany()
    await prisma.gym.deleteMany()
    await prisma.user.deleteMany()
  })

  it('should return a jwt when correct credentials are provided', async () => {
    const passwordHash = await hash('123456', 6)
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password_hash: passwordHash,
      },
    })

    const response = await app.inject({
      method: 'POST',
      url: '/sessions',
      payload: {
        email: 'john@example.com',
        password: '123456',
      },
    })

    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)
    expect(body).toEqual({ token: expect.any(String) })
  })

  it('should return 400 when credentials are wrong', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/sessions',
      payload: {
        email: 'non@existent.com',
        password: '123456',
      },
    })

    expect(response.statusCode).toBe(400)
    const body = JSON.parse(response.body)
    expect(body).toMatchObject({ message: expect.any(String) })
  })
})
