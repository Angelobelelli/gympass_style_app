import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearByGymsUseCase() {
  const gymsInRepository = new PrismaGymsRepository()
  const gymsUseCase = new FetchNearbyGymsUseCase(gymsInRepository)

  return gymsUseCase
}
