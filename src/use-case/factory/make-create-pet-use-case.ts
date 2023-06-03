import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const petRepo = new PrismaPetsRepository()
  const createPetUseCase = new CreatePetUseCase(petRepo)
  return createPetUseCase
}
