import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsUseCaseRequest {
  age?: string
  size?: string
  energy?: number
  levelDependency?: string
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petRepo: PetsRepository) {}

  async execute(
    data: FetchPetsUseCaseRequest,
  ): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petRepo.filter(data)

    return { pets }
  }
}
