import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckInUserCase } from '../check-in'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const gymRepository = new PrismaGymsRepository()
  const checkInsUseCase = new CheckInUserCase(checkInRepository, gymRepository)

  return checkInsUseCase
}
