import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Search Gyms controller (e2e)', () => {
  beforeEach(async () => {
    await prisma.checkIn.deleteMany()
    await prisma.gym.deleteMany()
    await prisma.user.deleteMany()
  })

  it('should be able to search gyms by title', async () => {
    const passwordHash = await hash('123456', 6)
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password_hash: passwordHash,
        role: 'ADMIN',
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

    await app.inject({
      method: 'POST',
      url: '/gyms',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload: {
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '1199999999',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    await app.inject({
      method: 'POST',
      url: '/gyms',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload: {
        title: 'TypeScript Gym',
        description: 'Some description',
        phone: '1199999999',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    const response = await app.inject({
      method: 'GET',
      url: '/gyms/search',
      query: {
        q: 'JavaScript',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)
    expect(body.gyms).toHaveLength(1)
    expect(body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })
})
