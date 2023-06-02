import { Prisma, AdoptionRequirements } from '@prisma/client'
import { AdoptionsRepository } from '../adoptions-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryAdoptionsRepository implements AdoptionsRepository {
  public items: AdoptionRequirements[] = []

  async create(data: Prisma.AdoptionRequirementsUncheckedCreateInput) {
    const adoption: AdoptionRequirements = {
      id: data.id ?? randomUUID(),
      description: data.description,
      pet_id: data.pet_id,
    }

    this.items.push(adoption)

    return adoption
  }
}
