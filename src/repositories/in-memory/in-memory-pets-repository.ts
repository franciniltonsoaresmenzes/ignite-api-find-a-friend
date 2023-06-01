import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findByCity(city: string) {
    const pets = this.items.filter((item) => item.city === city)

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      city: data.city,
      age: data.age,
      size: data.size,
      energy: data.energy,
      levelDependency: data.levelDependency,
      habitatProperty: data.habitatProperty,
      orgs_id: data.orgs_id,
    }

    this.items.push(pet)

    return pet
  }
}
