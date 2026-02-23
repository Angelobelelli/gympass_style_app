import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUserCase } from '../validate-check-in'

export function makeValidateChecInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const checkInsUseCase = new ValidateCheckInUserCase(checkInRepository)

  return checkInsUseCase
}
