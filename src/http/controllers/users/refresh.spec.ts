import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Refresh Token controller (e2e)', () => {
  beforeEach(async () => {
    await prisma.checkIn.deleteMany()
    await prisma.gym.deleteMany()
    await prisma.user.deleteMany()
  })

  it('should be able to refresh a token', async () => {
    const passwordHash = await hash('123456', 6)
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password_hash: passwordHash,
      },
    })

    const authRes = await app.inject({
      method: 'POST',
      url: '/sessions',
      payload: {
        email: 'john@example.com',
        password: '123456',
      },
    })

    const cookies = authRes.cookies

    const response = await app.inject({
      method: 'PATCH',
      url: '/token/refresh',
      cookies: {
        refreshToken: cookies[0].value,
      },
    })

    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)
    expect(body).toEqual({ token: expect.any(String) })
    expect(response.cookies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'refreshToken',
        }),
      ]),
    )
  })
})
