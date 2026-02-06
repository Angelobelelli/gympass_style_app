import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'TS GYM',
      description: '',
      phone: '',
      latitude: -20.116454,
      longitude: -41.177162,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
