import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetUseCase } from '../get-pet'

export function makeGetPetUseCase() {
  const petRepo = new PrismaPetsRepository()
  const makeGetPetUseCase = new GetPetUseCase(petRepo)
  return makeGetPetUseCase
}
