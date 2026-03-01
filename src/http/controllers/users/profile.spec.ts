import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

// end-to-end tests for the protected profile route

describe('Profile controller (e2e)', () => {
  beforeEach(async () => {
    await prisma.checkIn.deleteMany()
    await prisma.gym.deleteMany()
    await prisma.user.deleteMany()
  })

  it('should return user profile when authenticated', async () => {
    const passwordHash = await hash('123456', 6)
    const user = await prisma.user.create({
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

    const { token } = JSON.parse(authRes.body)

    const profileRes = await app.inject({
      method: 'GET',
      url: '/me',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(profileRes.statusCode).toBe(200)
    const body = JSON.parse(profileRes.body)
    expect(body.user).toEqual(
      expect.objectContaining({
        id: user.id,
        email: 'john@example.com',
      }),
    )
    expect(body.user.password_hash).toBeUndefined()
  })

  it('should return 401 when no token is provided', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/me',
    })

    expect(response.statusCode).toBe(401)
    const body = JSON.parse(response.body)
    expect(body).toMatchObject({ message: 'Unauthorized' })
  })
})
