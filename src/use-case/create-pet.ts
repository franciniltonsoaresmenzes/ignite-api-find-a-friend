import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  city: string
  age: string
  size: string
  energy: number
  levelDependency: string
  habitatProperty: string
  orgs_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petRepo: PetsRepository) {}

  async execute({
    name,
    description,
    city,
    age,
    size,
    energy,
    levelDependency,
    habitatProperty,
    orgs_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petRepo.create({
      name,
      description,
      city,
      age,
      size,
      energy,
      levelDependency,
      habitatProperty,
      orgs_id,
    })

    return { pet }
  }
}
