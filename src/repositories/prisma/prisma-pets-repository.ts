import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id } })
    return pet
  }

  async filter(data: Partial<Prisma.PetCreateManyOrgsInput>) {
    const pet = await prisma.pet.findMany({ where: data })
    return pet
  }

  async findByCity(city: string) {
    const pet = await prisma.pet.findMany({ where: { city } })
    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        description: data.description,
        city: data.city,
        age: data.age,
        size: data.size,
        energy: data.energy,
        levelDependency: data.levelDependency,
        habitatProperty: data.habitatProperty,
        orgs_id: data.orgs_id,
      },
    })
    return pet
  }
}
