import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsUseCase } from '../fetch-pets'

export function makeFetchPetsUseCase() {
  const petRepo = new PrismaPetsRepository()
  const makeFetchPetsUseCase = new FetchPetsUseCase(petRepo)
  return makeFetchPetsUseCase
}
