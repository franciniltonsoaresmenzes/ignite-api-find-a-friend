import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFound } from './error/resource-not-found'

interface GetPetUseCaseRequest {
  idPet: string
}

interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petRepo: PetsRepository) {}

  async execute({
    idPet,
  }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petRepo.findById(idPet)

    if (!pet) throw new ResourceNotFound()

    return { pet }
  }
}
