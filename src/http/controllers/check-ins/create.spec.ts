import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Create Check-in controller (e2e)', () => {
  beforeEach(async () => {
    await prisma.checkIn.deleteMany()
    await prisma.gym.deleteMany()
    await prisma.user.deleteMany()
  })

  it('should be able to create a check-in', async () => {
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

    const { token } = JSON.parse(authRes.body)

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    const response = await app.inject({
      method: 'POST',
      url: `/gyms/${gym.id}/check-ins`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload: {
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    expect(response.statusCode).toBe(201)
  })
})
