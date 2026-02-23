import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryUserCase } from '../fetch-member-check-ins-history copy'

export function makeFetchUserChecInsHistoryUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const checkInsUseCase = new FetchUserCheckInsHistoryUserCase(
    checkInRepository,
  )

  return checkInsUseCase
}
