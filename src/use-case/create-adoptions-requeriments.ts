import { AdoptionsRepository } from '@/repositories/adoptions-repository'
import { AdoptionRequirements } from '@prisma/client'

interface CreateAdoptionsRequerimentsUseCaseResponse {
  description: string
  pet_id: string
}

interface CreateAdoptionsRequerimentsUseCaseRequest {
  adoptions: AdoptionRequirements
}

export class CreateAdoptionsRequerimentsUseCase {
  constructor(private adoptionsRepo: AdoptionsRepository) {}

  async execute({
    description,
    pet_id,
  }: CreateAdoptionsRequerimentsUseCaseResponse): Promise<CreateAdoptionsRequerimentsUseCaseRequest> {
    const adoptions = await this.adoptionsRepo.create({ description, pet_id })

    return { adoptions }
  }
}
