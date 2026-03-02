import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Nearby Gyms controller (e2e)', () => {
  beforeEach(async () => {
    await prisma.checkIn.deleteMany()
    await prisma.gym.deleteMany()
    await prisma.user.deleteMany()
  })

  it('should be able to list nearby gyms', async () => {
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
        title: 'Near Gym',
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
        title: 'Far Gym',
        description: 'Some description',
        phone: '1199999999',
        latitude: -27.061592,
        longitude: -49.52295,
      },
    })

    const response = await app.inject({
      method: 'GET',
      url: '/gyms/nearby',
      query: {
        latitude: '-27.2092052',
        longitude: '-49.6401091',
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
        title: 'Near Gym',
      }),
    ])
  })
})
