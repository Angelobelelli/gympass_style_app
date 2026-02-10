import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gym'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Fetch Check-in History Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })
  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript',
      description: '',
      phone: '',
      latitude: -20.116454,
      longitude: -41.177162,
    })

    await gymsRepository.create({
      title: 'TypeScript',
      description: '',
      phone: '',
      latitude: -20.116454,
      longitude: -41.177162,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript' })])
  })
  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TypeScript ${i}`,
        description: '',
        phone: '',
        latitude: -20.116454,
        longitude: -41.177162,
      })
    }

    const { gyms } = await sut.execute({
      query: 'TypeScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TypeScript 21' }),
      expect.objectContaining({ title: 'TypeScript 22' }),
    ])
  })
})
