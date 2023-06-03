import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetByCityUseCase } from '../fetch-pet-by-city'

export function makeFetchPetByCityUseCase() {
  const petRepo = new PrismaPetsRepository()
  const fetchPetByCityUseCase = new FetchPetByCityUseCase(petRepo)

  return fetchPetByCityUseCase
}
