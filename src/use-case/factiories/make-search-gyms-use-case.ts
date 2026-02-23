import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymUseCase } from '../search-gym'

export function makeSearchGymsUseCase() {
  const gymsInRepository = new PrismaGymsRepository()
  const gymsUseCase = new SearchGymUseCase(gymsInRepository)

  return gymsUseCase
}
