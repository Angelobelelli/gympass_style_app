import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })
  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: '',
      phone: '',
      latitude: -20.137383,
      longitude: -40.183935,
    })
    await gymsRepository.create({
      title: 'Far Gym',
      description: '',
      phone: '',
      latitude: -20.28495,
      longitude: -40.290804,
    })
    const { gyms } = await sut.execute({
      userLatitude: -20.117829,
      userLongitude: -40.177509,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
