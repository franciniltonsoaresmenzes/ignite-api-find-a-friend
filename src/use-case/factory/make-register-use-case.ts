import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterUsaCase } from '../register'

export function makeRegisterUseCase() {
  const repo = new PrismaOrgsRepository()
  const registerUseCase = new RegisterUsaCase(repo)

  return registerUseCase
}
