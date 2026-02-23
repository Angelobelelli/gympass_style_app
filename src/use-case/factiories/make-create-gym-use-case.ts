import { CreateGymUseCase } from '../create-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCreateGymUseCase() {
  const gymsInRepository = new PrismaGymsRepository()
  const gymsUseCase = new CreateGymUseCase(gymsInRepository)

  return gymsUseCase
}
