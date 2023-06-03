import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const repository = new PrismaOrgsRepository()
  const authenticateUseCase = new AuthenticateUseCase(repository)

  return authenticateUseCase
}
