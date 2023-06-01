import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) return null

    return pet
  }

  async filter(data: Partial<Prisma.PetCreateManyOrgsInput>) {
    const pets = this.items.filter((item) => {
      for (const key in data) {
        if (
          item[key as keyof Prisma.PetCreateManyOrgsInput] !==
          data[key as keyof Prisma.PetCreateManyOrgsInput]
        ) {
          return false
        }
      }
      return true
    })

    return pets
  }

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

interface props {
  id: string
  name: string
}

const items: props[] = [
  {
    id: '1',
    name: 'Fran',
  },
  {
    id: '2',
    name: 'Jõao',
  },
]

function main(data: Partial<props>) {
  const a = items.filter((item) => {
    for (const key in data) {
      if (item[key as keyof props] !== data[key as keyof props]) {
        return false
      }
    }

    return true
  })

  return a
}
